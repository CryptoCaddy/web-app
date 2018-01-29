import * as DatabaseUtil from './database.util';

interface TestModel1 {
  id: number;
  name: string;
}

function isTestModel1(m: TestModel1): m is TestModel1 {
  return m != null &&
    typeof m.id === 'number' &&
    typeof m.name === 'string';
}

interface TestModel2 {
  id: string;
  name: string;
}

function isTestModel2(m: TestModel2): m is TestModel2 {
  return m != null &&
    (m.id != null && typeof m.id === 'string') &&
    (m.name != null && typeof m.name === 'string');
}
describe('DatabaseUtil', () => {

  afterEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  describe('::loadFromStorage', () => {
    it('should load data from storage', () => {
      sessionStorage.setItem('TestModelDatabase', JSON.stringify([
        { id: 4, name: 'four' },
        [ ],
        { id: '2', name: 'two' },
        { },
        { id: '3', name: 'three' },
        { id: 1, name: 'one' },
        { id: 0, name: null },
        null,
      ]));

      localStorage.setItem('TestModelDatabase', JSON.stringify([
        { id: 1, name: 'one' },
        { id: 2, name: 'two' },
        undefined,
        { id: 3, name: 'three' },
        'some',
        { id: 4, name: 'four' },
        { id: 5, name: 5 },
        { id: 6, name: undefined },
      ]));

      expect(DatabaseUtil.loadFromStorage(sessionStorage, 'TestModelDatabase', isTestModel1))
        .toEqual([
          { id: 4, name: 'four' },
          { id: 1, name: 'one' },
        ]);

      expect(DatabaseUtil.loadFromStorage(sessionStorage, 'TestModelDatabase', isTestModel2))
        .toEqual([
          { id: '2', name: 'two' },
          { id: '3', name: 'three' },
        ]);

      expect(DatabaseUtil.loadFromStorage(localStorage, 'TestModelDatabase', isTestModel1))
        .toEqual([
        { id: 1, name: 'one' },
        { id: 2, name: 'two' },
        { id: 3, name: 'three' },
        { id: 4, name: 'four' },
      ]);

      expect(DatabaseUtil.loadFromStorage(localStorage, 'TestModelDatabase', isTestModel2))
        .toEqual([ ]);
    });
  });

});
