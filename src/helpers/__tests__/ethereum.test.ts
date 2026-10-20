import { isContractCode } from '../ethereum';

describe('isContractCode', () => {
  it('treats an address without code as a regular account', () => {
    expect(isContractCode('0x')).toBe(false);
    expect(isContractCode('0x0')).toBe(false);
  });

  it('treats an EIP-7702 delegated account as a regular account', () => {
    expect(isContractCode('0xef010063c0c19a282a1b52b07dd5a65b58948a07dae32b')).toBe(false);
    expect(isContractCode('0xEF010063C0C19A282A1B52B07DD5A65B58948A07DAE32B')).toBe(false);
  });

  it('treats deployed bytecode as a contract', () => {
    expect(isContractCode('0x6080604052348015600f57600080fd5b50')).toBe(true);
  });

  it('does not mistake longer code that starts like a designator for one', () => {
    expect(isContractCode('0xef010063c0c19a282a1b52b07dd5a65b58948a07dae32b00')).toBe(true);
  });
});
