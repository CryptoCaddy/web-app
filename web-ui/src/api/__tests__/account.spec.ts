import { AccountApi } from '@/api/account';
import { AccountPreferences } from '@/store/modules/account.state';

jest.useFakeTimers();

describe('AccountApi', () => {
  describe('getPreferences', () => {
    describe('if request succeeded', () => {
      // @TODO
      it('should return the user\'s preferences', () => {
        const result = AccountApi.getPreferences();
        jest.runOnlyPendingTimers();

        expect(result).resolves
          .toEqual(expect.objectContaining({
            currency: expect.any(String),
            timezone: expect.any(String),
          }));
      });
    });

    describe('if request failed', () => {
      // @TODO
      it('should reject with an error message');
    });
  });

  describe('updatePreferences', () => {
    describe('if request succeeded', () => {
      // @TODO
      it('should return the updated preferences', () => {
        const preferences: AccountPreferences = {
          currency: 'eur',
          timezone: 'Europe/Berlin',
        };
        const result = AccountApi.updatePreferences(preferences);
        jest.runOnlyPendingTimers();

        expect(result).resolves
          .toEqual(expect.objectContaining({
            currency: expect.any(String),
            timezone: expect.any(String),
          }));

        expect(result).resolves.toMatchObject(preferences);
        expect(result).resolves.not.toBe(preferences);
      });
    });

    describe('if request failed', () => {
      // @TODO
      it('should reject with an error message');
    });
  });
});
