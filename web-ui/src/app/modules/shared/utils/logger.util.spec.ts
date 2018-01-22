import { environment } from 'environments/environment';

import { Logger } from './logger.util';

// mock the environment import to be able to change the production flag.
jest.mock('environments/environment');

describe('LoggerUtil', () => {

  it('should exist', () => {
    expect(Logger).toBeTruthy();
    expect(typeof Logger).toEqual('function');
  });

  // importat: reset global variables after each test run
  afterEach(() => {
    window['__isJest'] = true;
    environment.production = false;
  });

  describe('logChange', () => {
    it('should log a collapsed group when not in production', () => {
      window['__isJest'] = false;

      window.console.groupCollapsed = jest.fn();
      window.console.info = jest.fn();
      window.console.groupEnd = jest.fn();

      expect(() => Logger.logChange('Jest', 'test', { })).not.toThrowError();
      expect(window.console.groupCollapsed).toHaveBeenCalledWith('Jest::test');
      expect(window.console.info).toHaveBeenCalledWith({ });
      expect(window.console.groupEnd).toHaveBeenCalled();
    });

    it('should not log in jest environment', () => {
      window.console.groupCollapsed = jest.fn();
      window.console.info = jest.fn();
      window.console.groupEnd = jest.fn();

      expect(() => Logger.logChange('Jest', 'test', { })).not.toThrowError();
      expect(window.console.groupCollapsed).not.toHaveBeenCalled();
      expect(window.console.info).not.toHaveBeenCalled();
      expect(window.console.groupEnd).not.toHaveBeenCalled();
    });

    it('should not log in production', () => {
      window['__isJest'] = false;
      environment.production = true;

      window.console.groupCollapsed = jest.fn();
      window.console.info = jest.fn();
      window.console.groupEnd = jest.fn();

      expect(() => Logger.logChange('Jest', 'test', { })).not.toThrowError();
      expect(window.console.groupCollapsed).not.toHaveBeenCalled();
      expect(window.console.info).not.toHaveBeenCalled();
      expect(window.console.groupEnd).not.toHaveBeenCalled();
    });
  });

});
