export interface ApiError {

  /** Http status code */
  status: number;

  /** Http status message for given code */
  error: string;

  /** Internal exception */
  exception: string;

  /** Error message for user */
  message: string;

  /** Api endpoint */
  path: string;

  /** Timestamp */
  timestamp: number;

}
