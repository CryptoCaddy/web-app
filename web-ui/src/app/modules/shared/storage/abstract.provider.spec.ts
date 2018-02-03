import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';

import { AbstractApiService } from '../services/abstract-api.service';
import { AbstractProvider } from './abstract.provider';
import { take } from 'rxjs/operators';

interface MockUser {
  id: number;
  email: string;
}

function isMockUser(o): o is MockUser {
  return o != null && typeof o.id === 'number' && typeof o.email === 'string';
}

@Injectable()
class MockUserApiService extends AbstractApiService<MockUser> {
  public list(): Observable<MockUser[]> {
    return of([ ]);
  }
  public add(item: MockUser): Observable<MockUser> {
    return of(item);
  }
  public update(item: MockUser): Observable<MockUser> {
    return of(item);
  }
  public drop(item: MockUser): Observable<boolean> {
    return of(true);
  }
}

@Injectable()
class MockUserProvider extends AbstractProvider<MockUser> {

  protected idProperty = 'id';

  constructor(mockUserApi: MockUserApiService) {
    super(mockUserApi, localStorage, isMockUser);
    this.init();
  }

}

describe('AbstractProvider', () => {
  let provider: MockUserProvider;
  let apiMock: MockUserApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockUserProvider,
        MockUserApiService,
      ],
    });

    apiMock = TestBed.get(MockUserApiService);
  });

  function initProvider() {
    TestBed.overrideProvider(MockUserProvider, { useValue: () => MockUserProvider });
    provider = TestBed.get(MockUserProvider);
  }

  // Make sure the session storage is clean after each test
  afterEach(() => {
    sessionStorage.clear();
  });

  describe('intial Database state', () => {
    it('should be empty', () => {
      expect.assertions(1);
      initProvider();

      provider.data$.subscribe((data) => {
        expect(data.length).toEqual(0);
      });
    });

    it('should load data from sessionStorage', async() => {
      expect.assertions(2);

      initDatabase(localStorage, [
        <MockUser>{ id: 1, email: 'foo@local' },
      ]);
      initProvider();

      const data = await provider.data$.pipe(take(1)).toPromise();
      expect(data.length).toEqual(1);
      expect(data[0].email).toEqual('foo@local');
    });

    it('should handle invalid data in sessionStorage', async() => {
      initDatabase(localStorage, 'invalidData' as any);
      initProvider();
      expect((await provider.data$.pipe(take(1)).toPromise()).length).toEqual(0);

      initDatabase(localStorage, { not: 'an array' } as any);
      initProvider();
      expect((await provider.data$.pipe(take(1)).toPromise()).length).toEqual(0);

      initDatabase(localStorage, [ 'not what we expected' ] as any);
      initProvider();
      expect((await provider.data$.pipe(take(1)).toPromise()).length).toEqual(0);
    });

    it('should handle data already stored on server', async() => {
      apiMock.list = jest.fn(() => of([
        { id: 1, email: 'foo@remote' },
        { id: 2, email: 'bar@remote' },
      ] as MockUser[]));
      initDatabase(localStorage);
      initProvider();

      expect((await provider.data$.pipe(take(1)).toPromise()).length).toEqual(2);
      expect((await provider.data$.pipe(take(1)).toPromise())[0].email).toEqual('foo@remote');
      expect((await provider.data$.pipe(take(1)).toPromise())[1].email).toEqual('bar@remote');
    });

    it('should simply merge local and remote data if there are no conflicts', async() => {
      apiMock.list = jest.fn(() => of([
        { id: 1, email: 'foo@remote' },
        { id: 2, email: 'bar@remote' },
      ] as MockUser[]));
      initDatabase(localStorage, [
        { id: 3, email: 'foo@local' },
        { id: 4, email: 'bar@local' },
      ]);
      initProvider();

      expect((await provider.data$.pipe(take(1)).toPromise()).length).toEqual(4);
      expect((await provider.data$.pipe(take(1)).toPromise())[0].email).toEqual('foo@local');
      expect((await provider.data$.pipe(take(1)).toPromise())[1].email).toEqual('bar@local');
      expect((await provider.data$.pipe(take(1)).toPromise())[2].email).toEqual('foo@remote');
      expect((await provider.data$.pipe(take(1)).toPromise())[3].email).toEqual('bar@remote');
    });

    it('should merge local and remote data if they\'re conflicting, favoring remote data', async() => {
      apiMock.list = jest.fn(() => of([
        { id: 1, email: 'foo@remote' },
        { id: 2, email: 'bar@remote' },
      ] as MockUser[]));
      initDatabase(localStorage, [
        { id: 2, email: 'foo@local' },
        { id: 3, email: 'bar@local' },
      ]);
      initProvider();

      expect((await provider.data$.pipe(take(1)).toPromise()).length).toEqual(3);
      expect((await provider.data$.pipe(take(1)).toPromise())[0]).toEqual({ id: 2, email: 'bar@remote' });
      expect((await provider.data$.pipe(take(1)).toPromise())[1]).toEqual({ id: 3, email: 'bar@local' });
      expect((await provider.data$.pipe(take(1)).toPromise())[2]).toEqual({ id: 1, email: 'foo@remote' });
    });
  });

  describe('#save', () => {
    it('should add an element to the database', async() => {
      const successFn = jest.fn();
      const errorFn = jest.fn();

      apiMock.add = jest.fn(() => of(null));

      initDatabase(localStorage);
      initProvider();

      expect((await provider.data$.pipe(take(1)).toPromise()).length).toBe(0);

      provider.add({ id: 1, email: 'foo@local' })
        .subscribe(successFn, errorFn);
      expect((await provider.data$.pipe(take(1)).toPromise()).length).toBe(1);

      provider.add({ id: 2, email: 'bar@local' })
        .subscribe(successFn, errorFn);
      expect((await provider.data$.pipe(take(1)).toPromise()).length).toBe(2);

      expect(successFn).toHaveBeenCalledTimes(2);
      expect(errorFn).not.toHaveBeenCalled();
    });

    it('should propagate an error if an element could not be added', async() => {
      apiMock.add = jest.fn(() => _throw(null));
      const successFn = jest.fn();
      const errorFn = jest.fn();

      initDatabase(localStorage);
      initProvider();

      expect((await provider.data$.pipe(take(1)).toPromise()).length).toBe(0);

      provider.add({ id: 1, email: 'foo@local' })
        .subscribe(successFn, errorFn);

      provider.add({ id: 2, email: 'bar@local' })
        .subscribe(successFn, errorFn);

      expect((await provider.data$.pipe(take(1)).toPromise()).length).toBe(0);
      expect(successFn).not.toHaveBeenCalled();
      expect(errorFn).toHaveBeenCalledTimes(2);
    });

  });

  describe('#update', () => {
    it('should update an existing record', async() => {
      const successFn = jest.fn();
      const errorFn = jest.fn();

      initDatabase(localStorage, [
        { id: 1, email: 'foo@local' },
        { id: 2, email: 'bar@local' },
      ]);
      initProvider();

      expect((await provider.data$.pipe(take(1)).toPromise()).length).toBe(2);

      provider.update({ id: 2, email: 'bar@updated' }).subscribe(successFn, errorFn);
      expect(successFn).toHaveBeenCalled();
      expect(errorFn).not.toHaveBeenCalled();
      expect((await provider.data$.pipe(take(1)).toPromise()).length).toBe(2);
      expect((await provider.data$.pipe(take(1)).toPromise())[0].id).toBe(1);
      expect((await provider.data$.pipe(take(1)).toPromise())[0].email).toBe('foo@local');
      expect((await provider.data$.pipe(take(1)).toPromise())[1].id).toBe(2);
      expect((await provider.data$.pipe(take(1)).toPromise())[1].email).toBe('bar@updated');

      successFn.mockReset();
      errorFn.mockReset();
      apiMock.update = jest.fn(() => _throw('fooErr'));

      provider.update({ id: 1, email: 'foo@updated' }).subscribe(successFn, errorFn);
      expect(successFn).not.toHaveBeenCalled();
      expect(errorFn).toHaveBeenCalled();
      expect((await provider.data$.pipe(take(1)).toPromise()).length).toBe(2);
      expect((await provider.data$.pipe(take(1)).toPromise())[0].id).toBe(1);
      expect((await provider.data$.pipe(take(1)).toPromise())[0].email).toBe('foo@local');
      expect((await provider.data$.pipe(take(1)).toPromise())[1].id).toBe(2);
      expect((await provider.data$.pipe(take(1)).toPromise())[1].email).toBe('bar@updated');
    });
  });

  describe('#drop', () => {
    it('should remove an existing entry from the database', async() => {
      const successFn = jest.fn();
      const errorFn = jest.fn();

      initDatabase(localStorage, [
        { id: 1, email: 'foo@local' },
        { id: 2, email: 'bar@local' },
      ]);
      initProvider();

      expect((await provider.data$.pipe(take(1)).toPromise()).length).toBe(2);

      provider.drop({ id: 1 } as any).subscribe(successFn, errorFn);
      expect(successFn).toHaveBeenCalledTimes(1);
      expect(errorFn).not.toHaveBeenCalled();
      expect((await provider.data$.pipe(take(1)).toPromise()).length).toBe(1);
      expect((await provider.data$.pipe(take(1)).toPromise())[0].email).toEqual('bar@local');

      successFn.mockReset();
      errorFn.mockReset();

      provider.drop({ id: 1 } as any).subscribe(successFn, errorFn);
      expect(successFn).not.toHaveBeenCalled();
      expect(errorFn).toHaveBeenCalledTimes(1);
      expect((await provider.data$.pipe(take(1)).toPromise()).length).toBe(1);
      expect((await provider.data$.pipe(take(1)).toPromise())[0].email).toEqual('bar@local');
    });
  });

});

function initDatabase(storage: Storage, initialState?: MockUser[]) {
  if (initialState) {
    storage.setItem(MockUserProvider.name, JSON.stringify(initialState));
  } else {
    storage.setItem(MockUserProvider.name, null);
  }
}
