import { expect } from 'expect';
import addressFormatter from '../addressFormatter';

describe('addressFormatter', () => {
  test('should return formatted address', () => {
    expect(addressFormatter('test-52j4b4j13mh8hs549ldhj1')).toContain('...');
  });
});
