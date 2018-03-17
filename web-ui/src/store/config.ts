/**
 * Default threshold time in milliseconds determining validity of data.
 * May be used with {@see RequestState.timestamp} to determine if the already
 * loaded data should be returned or a new request must be made.
 */
export const DEFAULT_VALIDITY_THRESHOLD = 60 * 1000;
