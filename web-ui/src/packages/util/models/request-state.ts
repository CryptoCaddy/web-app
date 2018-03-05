export interface RequestState {

  /** Currently loaded data. */
  data?: any;

  /** The error that occured on the last request. null if the request was successful */
  error: string | null;

  /** Whether the request is currently pending. */
  pending: boolean;

  /** The unix timestamp of the last successful request. */
  timestamp?: number;

}
