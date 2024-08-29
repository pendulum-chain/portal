import { config } from '../../config';

export async function createRedirectUrlToAlchemyPay(sourceUrl: string, redirectUrl: string) {
  const parameters = {
    redirectUrl,
    network: 'PEN',
    crypto: 'PENDULUM',
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

  // Parse the response
  const receivedParameters = await signatureResponse.json();
  const { sign, requestParams } = receivedParameters;

  const url = sourceUrl + '?' + requestParams + '&sign=' + sign;
  console.log('url', url);
  return url;
}
