import { ApiError } from '@/models/ApiError';
import axios, { AxiosError } from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mockHttp = new MockAdapter(axios);

describe('axios.interceptors', () => {
  describe('errorMessageInterceptor', () => {
    it('move crypto caddy error messages to the `messages` property', async () => {
      const errorFn = jest.fn();
      const apiError: ApiError = {
        detail: 'Error detail',
        message: 'Error message',
      };
      mockHttp.onGet('/mock').reply(400, apiError);

      await axios.get('/mock').catch((err: AxiosError) => errorFn(err.message));
      expect(errorFn).toHaveBeenCalledWith('Error message');
    });

    it('should handle regular exceptions', async () => {
      const errorFn = jest.fn();
      mockHttp.onGet('/mock').reply(400, {});

      await axios.get('/mock').catch((err: AxiosError) => errorFn(err.message));
      expect(errorFn).toHaveBeenCalledWith(
        'Request failed with status code 400',
      );

      errorFn.mockReset();
      mockHttp.onGet('/mock').reply(500, null);
      await axios.get('/mock').catch((err: AxiosError) => errorFn(err.message));
      expect(errorFn).toHaveBeenCalledWith(
        'Request failed with status code 500',
      );
    });
  });
});
