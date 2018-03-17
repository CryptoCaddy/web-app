export interface AccountState {
  error: string | null;
  loading: boolean;
  preferences: AccountPreferences;
  saving: boolean;
}

export interface AccountPreferences {
  currency?: string;
  timezone?: string;
}
