import { HttpErrorResponse } from '@angular/common/http';
import { ApiError } from 'app/modules/shared/models/api-error.model';

/**
 * convert a http error to a error message to display
 * @TODO user friendly error messagesa
 */
export function getHttpErrorMessage(err: HttpErrorResponse) {
  // error is a generic browser error
  if (err.error instanceof ProgressEvent) {
    switch (err.status) {
      case 0:
        return 'Request blocked or offline.';

      default:
        return err.message;
    }
  }

  // error is a custom api error
  return (err.error as ApiError).message;
}
