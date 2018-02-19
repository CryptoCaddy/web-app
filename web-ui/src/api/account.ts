import { AccountPreferences } from '@/store/modules/account.state';

export default {
  getPreferences(): Promise<AccountPreferences> {
    // @TODO real implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          currency: '',
          timezone: '',
        } as AccountPreferences);
      }, Math.random() * 2000);
    });
  },

  updatePreferences(
    preferences: AccountPreferences,
  ): Promise<AccountPreferences> {
    // @TODO real implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        return resolve(preferences);
      }, Math.random() * 2000);
    });
  },
};
