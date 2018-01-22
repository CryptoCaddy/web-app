import * as HttpUtil from './http.util';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';

describe('HttpUtils', () => {

  it('should extract the message of an HttpErrorResponse provided by the api', () => {
    const error = new HttpErrorResponse({
      headers: new HttpHeaders(),
      status: 500,
      statusText: 'Internal Server Error',
      url: 'http://localhost/error',
      error : {
        timestamp : 1514628501234,
        status  : 500,
        error : 'Internal Server Error',
        exception : 'com.example.packages.error',
        message : '-1: Unknown error.',
        path  : '/error',
      },
    });
    expect(HttpUtil.getHttpErrorMessage(error)).toEqual('-1: Unknown error.');

  });

  it('should extract the message of generic browser error', () => {
    let error = new HttpErrorResponse({
      headers: new HttpHeaders(),
      status: 0,
      statusText: 'Unknown Error',
      url: null,
      error: new ProgressEvent('offline'),
    });

    expect(HttpUtil.getHttpErrorMessage(error)).toEqual('Request blocked or offline.');

    error = new HttpErrorResponse({
      headers: new HttpHeaders(),
      status: -1,
      statusText: 'Fatal error',
      url: null,
      error: new ProgressEvent('offline'),
    });

    expect(HttpUtil.getHttpErrorMessage(error)).toEqual('Http failure response for (unknown url): -1 Fatal error');
  });

  it('should return a generic error message if no criteria matches', () => {
    const error = new HttpErrorResponse({
      headers: new HttpHeaders(),
      status: -1,
      statusText: 'Fatal error',
      url: null,
      error: { },
    });

    expect(HttpUtil.getHttpErrorMessage(error)).toEqual('An unknown error occurred: Fatal error');
  });

});
