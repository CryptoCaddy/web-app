import { AccountApi } from '@/api/account';
import { Logger } from '@/util/logger';
import { clone } from '@/util/object';

import RootStore from '../..';
import * as AccountStore from '../account';
import { AccountPreferences, AccountState } from '../account.state';

jest.mock('@/util/logger', () => ({
  Logger: {
    warn: jest.fn(),
  },
}));

describe('AccountStore', () => {
  const state: AccountState = RootStore.state.account;

  it('should contain a vuex module named `account`', () => {
    expect(AccountStore).toEqual(
      expect.objectContaining({
        moduleName: 'account',
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
        account: expect.any(Object),
      }),
    );

    expect(RootStore.getters).toEqual(
      expect.objectContaining({
        'account/error': null,
        'account/loading': false,
        'account/preferences': {},
        'account/saving': false,
      }),
    );
  });

  describe('dispatchers', () => {
    describe('loadPreferences', () => {
      it('should load the user preferences', async () => {
        const expectedState = clone(state);
        expectedState.loading = true;
        expectedState.error = null;

        AccountApi.getPreferences =
          jest.fn(() => Promise.resolve<AccountPreferences>({
            currency: 'eur',
            timezone: 'Europe/Berlin',
          }));

        const p = AccountStore.dispatchers.loadPreferences(RootStore);
        expect(state).toEqual(expectedState);

        expectedState.loading = false;
        expectedState.preferences = {
          currency: 'eur',
          timezone: 'Europe/Berlin',
        };
        await p;

        expect(state).toEqual(expectedState);
      });

      describe('if preferences could not be loaded', () => {
        it('should log an error and keep the current preferences', async () => {
          const expectedState = clone(state);
          expectedState.loading = false;
          expectedState.error = '500 - Internal Server Error';

          AccountApi.getPreferences =
            jest.fn(() => Promise.reject(new Error('500 - Internal Server Error')));
          await AccountStore.dispatchers.loadPreferences(RootStore);

          expect(Logger.warn).toHaveBeenLastCalledWith(
            'AccountStore#loadPreferences',
            new Error('500 - Internal Server Error'),
          );
          expect(state).toEqual(expectedState);
        });
      });
    });
  });
});
