import { isU128Compatible } from '../isU128Compatible';

describe('isU128Compatible', () => {
    it('should return true for minimum valid value', () => {
      expect(isU128Compatible('0')).toBe(true);
    });

    it('should return true for maximum valid value', () => {
      expect(isU128Compatible('340282366920938463463374607431768211455')).toBe(true);
    });

    it('should return false for decimal value', () => {
      expect(isU128Compatible('0.1')).toBe(false);
    });

    it('should return false for negative value', () => {
      expect(isU128Compatible('-1')).toBe(false);
    });

    it('should return false for value too large', () => {
      expect(isU128Compatible('340282366920938463463374607431768211456')).toBe(false);
    });

    it('should return false for non-numeric value', () => {
      expect(isU128Compatible('abc')).toBe(false);
    });

    it('should return false for null value', () => {
      expect(isU128Compatible(null)).toBe(false);
    });

    it('should return false for undefined value', () => {
      expect(isU128Compatible(undefined)).toBe(false);
    });
  });