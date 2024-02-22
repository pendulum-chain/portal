import { nativeToFormatMetric } from '../metric';
import BigNumber from 'big.js';
import { ONE_TOKEN } from './mocks';

describe('metric', () => {
  describe('nativeToFormatMetric', () => {
    it('should format numbers less than 1e-6', () => {
      const result = nativeToFormatMetric(ONE_TOKEN * 1e-7, 'PEN');
      expect(result).toEqual('100.00 nano PEN');
    });

    it('should format numbers to 1 micro', () => {
      console.log(Number(1e-3));
      const result = nativeToFormatMetric(ONE_TOKEN * 1e-3, 'PEN');
      expect(result).toEqual('1.00 milli PEN');
    });

    it('should format numbers to 1 milli', () => {
      const result = nativeToFormatMetric(ONE_TOKEN * 1e-6, 'PEN');
      expect(result).toEqual('1.00 micro PEN');
    });

    it('should format decimal digits correctly', () => {
      const result = nativeToFormatMetric(new BigNumber(ONE_TOKEN + 123456789123), 'PEN');
      expect(result).toEqual('1.12 PEN');
    });

    it('should format numbers correctly', () => {
      const result = nativeToFormatMetric(new BigNumber(ONE_TOKEN), 'AMPE');
      expect(result).toEqual(`1.00 AMPE`);
    });

    it('should handle string inputs', () => {
      const result = nativeToFormatMetric(`${ONE_TOKEN}`, 'AMPE');
      expect(result).toEqual(`1.00 AMPE`);
    });

    it('should handle number inputs', () => {
      const result = nativeToFormatMetric(ONE_TOKEN, 'AMPE');
      expect(result).toEqual(`1.00 AMPE`);
    });
  });
});
