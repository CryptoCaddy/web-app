import { AccountPreferences } from '@/store/modules/account.state';

export const AccountApi = {
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

  updatePreferences(preferences: AccountPreferences): Promise<AccountPreferences> {
    // @TODO real implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ...preferences });
      }, Math.random() * 2000);
    });
  },
};
