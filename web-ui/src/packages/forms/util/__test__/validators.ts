import * as Validators from '../validators';

describe('Validators', () => {
  describe('required', () => {
    it('should be a function', () => {
      expect(typeof Validators.required).toEqual('function');
    });

    it('should validate string fields', () => {
      expect(Validators.required('some string')).toEqual(true);
      expect(Validators.required(' ')).toEqual(true);
      expect(Validators.required('123.45')).toEqual(true);

      expect(Validators.required('')).toEqual(false);
      expect(Validators.required(undefined)).toEqual(false);
      expect(Validators.required(null)).toEqual(false);
    });
  });

  describe('email', () => {
    it('should be a function', () => {
      expect(typeof Validators.email).toEqual('function');
    });

    it('should not require input', () => {
      expect(Validators.email('')).toEqual(true);
    });

    it('should validate email address format', () => {
      expect(Validators.email('user@example.com')).toBe(true);
      expect(Validators.email('admin@localhost')).toBe(true);
      expect(Validators.email('admin+test@examile.com')).toBe(true);

      expect(Validators.email('user@')).toEqual(false);
      expect(Validators.email('user@ localhost')).toEqual(false);
      expect(Validators.email('@localhost')).toEqual(false);
      expect(Validators.email('user @localhost')).toEqual(false);
      expect(Validators.email('something different')).toEqual(false);
    });
  });

  describe('equals', () => {
    it('should be a function', () => {
      expect(typeof Validators.equals).toEqual('function');
    });

    it('should validate strict equality', () => {
      expect(Validators.equals(null, null)).toBeTruthy();
      expect(Validators.equals(null, undefined)).toBeTruthy();
      expect(Validators.equals(undefined, null)).toBeTruthy();

      expect(Validators.equals('c618f737-73b0-59d0-8a9c-6720a35ab81e', 'c618f737-73b0-59d0-8a9c-6720a35ab81e')).toBe(true);
      expect(Validators.equals('dojijezmajua', 'dojijezmajua')).toBe(true);
      expect(Validators.equals(184, 184)).toBe(true);

      expect(Validators.equals('184', 184)).toBe(false);
      expect(Validators.equals(184, '184')).toBe(false);
      expect(Validators.equals('dojijezmajua', 'DOJIJEZMAJUA')).toBe(false);
    });
  });
});
