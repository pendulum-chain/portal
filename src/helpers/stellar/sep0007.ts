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
  if (!vaultStellarAccount || !issueAmount || !assetCode || !assetIssuer || !issueRequestMemo) {
    return null;
  }
  return `web+stellar:pay?destination=${vaultStellarAccount}&amount=${issueAmount}&asset_code=${assetCode}&asset_issuer=${assetIssuer}&memo=${issueRequestMemo}&memo_type=MEMO_TEXT`;
}
