import { config } from '../../config';

export async function createRedirectUrlToAlchemyPay(sourceUrl: string, redirectUrl: string) {
  const parameters = {
    redirectUrl,
    showTable: 'buy',
  };

  // Send parameters to signature server to get a signature
  const query = new URLSearchParams(parameters).toString();
  const signatureResponse = await fetch(config.alchemyPay.signatureServer + '?' + query, {
    method: 'GET',
  });

  if (!signatureResponse.ok) {
    throw new Error('Failed to get signature');
  }

  const receivedParameters = await signatureResponse.json();
  // Extract the sign and requestParams from the response. `requestParams` is the query string without the `sign` component.
  // The ordering of the parameters is important, so we need to use the received parameters.
  const { sign, requestParams } = receivedParameters;

  return sourceUrl + '?' + requestParams + '&sign=' + sign;
}
