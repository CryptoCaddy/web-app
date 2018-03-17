import { RequestState } from '@/packages/util';
import { DEFAULT_VALIDITY_THRESHOLD } from '@/store/config';

export const StoreUtils = {
  getStoredData<T extends RequestState>(
    requestState: T,
    threshold = DEFAULT_VALIDITY_THRESHOLD,
  ): any | undefined {
    if (requestState.error || !requestState.timestamp) {
      return undefined;
    }

    const dataValidUntil = requestState.timestamp + threshold;
    if (Date.now() <= dataValidUntil) {
      return requestState.data;
    }

    return undefined;
  },
};
