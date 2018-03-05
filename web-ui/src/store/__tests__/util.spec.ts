import { StoreUtils } from '@/store/util';
import { RequestState } from '@/packages/util';

describe('.getStoredData', () => {
  it('should resolve stored data if it\'s still valid', () => {
    jest.spyOn(Date, 'now').mockReturnValue(+new Date('2018-01-01Z00:30:00.000'));
    const requestState: RequestState = {
      data: { foo: 'bar' },
      error: null,
      pending: false,
      timestamp: +new Date('2018-01-01Z00:00:30.000'),
    };

    expect(StoreUtils.getStoredData(requestState, 30 * 60 * 1000))
      .toEqual({ foo: 'bar' });
  });

  it('should resolve undefined if the data is not valid anymore', () => {
    jest.spyOn(Date, 'now').mockReturnValue(+new Date('2018-01-01Z00:31:00.000'));
    const requestState: RequestState = {
      data: { foo: 'bar' },
      error: null,
      pending: false,
      timestamp: +new Date('2018-01-01Z00:00:00.000'),
    };

    expect(StoreUtils.getStoredData(requestState, 30 * 60 * 1000))
      .toEqual(undefined);
  });

  it('should resolve undefined if the last request errored', () => {
    jest.spyOn(Date, 'now').mockReturnValue(+new Date('2018-01-01Z00:31:00.000'));
    const requestState: RequestState = {
      data: { foo: 'bar' },
      error: 'Something happend',
      pending: false,
      timestamp: +new Date('2018-01-01Z00:30:00.000'),
    };

    expect(StoreUtils.getStoredData(requestState, 30 * 60 * 1000))
      .toEqual(undefined);
  });

  it('should use the default threshold if none given', () => {
    jest.spyOn(Date, 'now').mockReturnValue(+new Date('2018-01-01Z00:30:00.000'));
    const requestState: RequestState = {
      data: { foo: 'bar' },
      error: null,
      pending: false,
      timestamp: +new Date('2018-01-01Z00:29:30.000'),
    };

    expect(StoreUtils.getStoredData(requestState))
      .toEqual({ foo: 'bar' });
  });
});
