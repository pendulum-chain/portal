import { generateSEP0007URIScheme } from '../sep0007';

describe('generateSEP0007URIScheme', () => {
  test('should return a valid SEP0007 URI scheme', () => {
    const params = {
      vaultStellarAccount: 'GABCDEF',
      issueAmount: '100',
      assetCode: 'AUDD',
      assetIssuer: 'GHIJKL',
      issueRequestMemo: 'MEMO',
    };

    const expectedURI =
      'web+stellar:pay?destination=GABCDEF&amount=100&asset_code=AUDD&asset_issuer=GHIJKL&memo=MEMO&memo_type=MEMO_TEXT';

    expect(generateSEP0007URIScheme(params)).toBe(expectedURI);
  });

  test('should return null when invalid parameters are provided', () => {
    const params = {
      vaultStellarAccount: '',
      issueAmount: '',
      assetCode: '',
      assetIssuer: '',
      issueRequestMemo: '',
    };

    expect(generateSEP0007URIScheme(params)).toBe(null);
  });

  test('should return a valid SEP0007 URI scheme for XLM (it doesnt include assetIssuer)', () => {
    const params = {
      vaultStellarAccount: 'GABCDEF',
      issueAmount: '100',
      assetCode: 'XLM',
      assetIssuer: '',
      issueRequestMemo: 'MEMO',
    };

    expect(generateSEP0007URIScheme(params)).toBe(
      'web+stellar:pay?destination=GABCDEF&amount=100&asset_code=XLM&memo=MEMO&memo_type=MEMO_TEXT',
    );
  });
});
