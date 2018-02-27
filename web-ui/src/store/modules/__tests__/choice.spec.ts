import { ChoicesApi } from '@/api/choices';
import { Logger } from '@/util/logger';
import { clone } from '@/util/object';

import RootStore from '../..';
import * as ChoiceStore from '../choice';
import { ChoiceState } from '../choice.state';
import { SelectOption } from '@/models/SelectOption';

jest.mock('@/util/logger', () => ({
  Logger: {
    warn: jest.fn(),
  },
}));

describe('ChoiceStore', () => {
  const state: ChoiceState = RootStore.state.choice;

  it('should contain a vuex module named `choice`', () => {
    expect(ChoiceStore).toEqual(
      expect.objectContaining({
        moduleName: 'choice',
        module: expect.objectContaining({
          state: expect.any(Object),
          getters: expect.any(Object),
          mutations: expect.any(Object),
          actions: expect.any(Object),
        }),
      }),
    );
  });

  it('should should be part of the root store', () => {
    expect(RootStore.state).toEqual(
      expect.objectContaining({
        choice: expect.any(Object),
      }),
    );

    expect(RootStore.getters).toEqual(
      expect.objectContaining({
        'choice/currency': { options: [], pending: false },
        'choice/timezone': { options: [], pending: false },
      }),
    );
  });

  describe('dispatchers', () => {
    describe('loadCurrencyOptions', () => {
      it('should load the available currencies committing intermediate states', async () => {
        const expectedState = clone(state);
        expectedState.currency.pending = true;
        expectedState.currency.options = [];

        ChoicesApi.getCurrencies = jest.fn(() =>
          Promise.resolve<SelectOption[]>([{ value: 'eur', label: 'Euro' }]),
        );

        const p = ChoiceStore.dispatchers.loadCurrencyOptions(RootStore);
        expect(state).toEqual(expectedState);

        expectedState.currency.pending = false;
        expectedState.currency.options = [{ value: 'eur', label: 'Euro' }];
        await p;

        expect(state).toEqual(expectedState);
      });

      describe('if currencies could not be loaded', () => {
        it('should log an error and return to a clean state', async () => {
          const expectedState = clone(state);
          expectedState.currency.pending = false;
          expectedState.currency.options = [];

          ChoicesApi.getCurrencies = jest.fn(() =>
            Promise.reject('500 - Internal Server Error'),
          );
          await ChoiceStore.dispatchers.loadCurrencyOptions(RootStore);

          expect(Logger.warn).toHaveBeenLastCalledWith(
            'ChoiceStore#loadCurrencyOptions',
            '500 - Internal Server Error',
          );
          expect(state).toEqual(expectedState);
        });
      });
    });

    describe('loadTimezoneOptions', () => {
      it('should load the available timezones committing intermediate states', async () => {
        const expectedState = clone(state);
        expectedState.timezone.pending = true;
        expectedState.timezone.options = [];

        ChoicesApi.getTimezones = jest.fn(() =>
          Promise.resolve<SelectOption[]>([
            { value: 'Europe/Berlin', label: 'Europe/Berlin' },
          ]),
        );
        const p = ChoiceStore.dispatchers.loadTimezoneOptions(RootStore);
        expect(state).toEqual(expectedState);

        expectedState.timezone.pending = false;
        expectedState.timezone.options = [
          { value: 'Europe/Berlin', label: 'Europe/Berlin' },
        ];
        await p;

        expect(state).toEqual(expectedState);
      });
    });

    describe('if timezones could not be loaded', () => {
      it('should log an error and return to a clean state', async () => {
        const expectedState = clone(state);
        expectedState.timezone.pending = false;
        expectedState.timezone.options = [];

        ChoicesApi.getTimezones = jest.fn(() =>
          Promise.reject('500 - Internal Server Error'),
        );
        await ChoiceStore.dispatchers.loadTimezoneOptions(RootStore);

        expect(Logger.warn).toHaveBeenLastCalledWith(
          'ChoiceStore#loadTimezoneOptions',
          '500 - Internal Server Error',
        );
        expect(state).toEqual(expectedState);
      });
    });
  });
});
