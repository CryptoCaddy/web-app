import { ChoicesApi } from '../choices';

jest.useFakeTimers();

describe('ChoicesApi', () => {
  describe('getCurrencies()', () => {
    describe('if request succeeded', () => {
      // @TODO
      it(`should return an array of available currencies as SelectOptions`, () => {
        const result = ChoicesApi.getCurrencies();
        jest.runOnlyPendingTimers();

        expect(result).resolves.toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              label: expect.any(String),
              value: expect.any(String),
            }),
          ]),
        );
      });
    });

    describe('if request failed', () => {
      // @TODO
      it(`should reject with an error message`);
    });
  });

  describe('getTimezones()', () => {
    describe('if request succeeded', () => {
      // @TODO
      it(`should return an array of available timezones as SelectOptions`, () => {
        const result = ChoicesApi.getTimezones();
        jest.runOnlyPendingTimers();

        expect(result).resolves.toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              label: expect.any(String),
              value: expect.any(String),
            }),
          ]),
        );
      });
    });

    describe('if request failed', () => {
      // @TODO
      it(`should reject with an error message`);
    });
  });
});
