export interface AccountState {
  error: Error | null;
  loading: boolean;
  saving: boolean;
  preferences: AccountPreferences;
}

export interface AccountPreferences {
  currency: string;
  timezone: string;
}
