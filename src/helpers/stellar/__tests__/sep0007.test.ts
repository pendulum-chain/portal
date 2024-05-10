import { generateSEP0007URIScheme } from '../sep0007';

describe('generateSEP0007URIScheme', () => {
  test('should return a valid SEP0007 URI scheme', () => {
    const params = {
      vault_stellar_account: 'GABCDEF',
      issue_amount: '100',
      asset_code: 'XLM',
      asset_issuer: 'GHIJKL',
      issue_request_memo: 'MEMO',
    };

    const expectedURI =
      'web+stellar:pay?destination=GABCDEF&amount=100&asset_code=XLM&asset_issuer=GHIJKL&memo=MEMO&memo_type=MEMO_TEXT';

    expect(generateSEP0007URIScheme(params)).toBe(expectedURI);
  });

  test('should throw an error when invalid parameters are provided', () => {
    const params = {
      vault_stellar_account: '',
      issue_amount: '',
      asset_code: '',
      asset_issuer: '',
      issue_request_memo: '',
    };

    expect(() => generateSEP0007URIScheme(params)).toThrow(
      'Invalid parameters provided for SEP0007 URI scheme generation',
    );
  });
});
