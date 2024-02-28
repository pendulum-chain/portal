import { nativeToFormatDecimal } from '../decimal';
import BigNumber from 'big.js';
import { ONE_TOKEN } from './mocks';

describe('decimal', () => {
  describe('nativeToFormatDecimal', () => {
    it('should format numbers less than 1e-6', () => {
      const result = nativeToFormatDecimal(ONE_TOKEN * 1e-7, 'PEN');
      expect(result).toEqual('< 0.000001 PEN');
    });

    it('should format numbers 1 micro as 0.001', () => {
      console.log(Number(1e-3));
      const result = nativeToFormatDecimal(ONE_TOKEN * 1e-3, 'PEN');
      expect(result).toEqual('0.001 PEN');
    });

    it('should format numbers 1 milli as 0.000001', () => {
      const result = nativeToFormatDecimal(ONE_TOKEN * 1e-6, 'PEN');
      expect(result).toEqual('0.000001 PEN');
    });

    it('should format decimal digits correctly', () => {
      const result = nativeToFormatDecimal(new BigNumber(ONE_TOKEN + 123456789123), 'PEN');
      expect(result).toEqual('1.123457 PEN');
    });

    it('should format numbers correctly', () => {
      const result = nativeToFormatDecimal(new BigNumber(ONE_TOKEN), 'PEN');
      expect(result).toEqual('1.00 PEN');
    });

    it('should handle string inputs', () => {
      const result = nativeToFormatDecimal(`${ONE_TOKEN}`, 'PEN');
      expect(result).toEqual('1.00 PEN');
    });

    it('should handle number inputs', () => {
      const result = nativeToFormatDecimal(ONE_TOKEN, 'PEN');
      expect(result).toEqual('1.00 PEN');
    });
  });
});
