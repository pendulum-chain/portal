interface GenerateSEP0007URIScheme {
  vault_stellar_account: string;
  issue_amount: string;
  asset_code: string;
  asset_issuer: string;
  issue_request_memo: string;
}

export function generateSEP0007URIScheme({
  vault_stellar_account,
  issue_amount,
  asset_code,
  asset_issuer,
  issue_request_memo,
}: GenerateSEP0007URIScheme) {
  if (!vault_stellar_account || !issue_amount || !asset_code || !asset_issuer || !issue_request_memo) {
    throw new Error('Invalid parameters provided for SEP0007 URI scheme generation');
  }
  return `web+stellar:pay?destination=${vault_stellar_account}&amount=${issue_amount}&asset_code=${asset_code}&asset_issuer=${asset_issuer}&memo=${issue_request_memo}&memo_type=MEMO_TEXT`;
}
