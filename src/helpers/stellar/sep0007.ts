interface GenerateSep0007UriScheme {
  vaultStellarAccount: string;
  issueAmount: string;
  assetCode: string;
  assetIssuer: string;
  issueRequestMemo: string;
}

export function generateSEP0007URIScheme({
  vaultStellarAccount,
  issueAmount,
  assetCode,
  assetIssuer,
  issueRequestMemo,
}: GenerateSep0007UriScheme) {
  const isXLM = assetCode === 'XLM';

  if (!vaultStellarAccount || !issueAmount || !issueRequestMemo || (!isXLM && (!assetCode || !assetIssuer))) {
    return null;
  }

  const assetIssuerProperty = assetIssuer ? `&asset_issuer=${assetIssuer}` : '';
  return `web+stellar:pay?destination=${vaultStellarAccount}&amount=${issueAmount}&asset_code=${assetCode}${assetIssuerProperty}&memo=${issueRequestMemo}&memo_type=MEMO_TEXT`;
}
