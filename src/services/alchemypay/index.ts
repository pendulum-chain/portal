import { config } from '../../config';

export async function createRedirectUrlToAlchemyPay(sourceUrl: string, redirectUrl: string) {
  const parameters = {
    redirectURL: redirectUrl,
    appId: 'wNxCyQNce01WLqyL',
    network: 'PEN',
    crypto: 'PENDULUM',
    showTable: 'buy',
    type: 'buy',
  };

  // Send parameters to signature server to get a signature
  const query = new URLSearchParams(parameters).toString();
  // Do get request with encoded parameters
  // const signatureResponse = await fetch(config.alchemyPay.signatureServer + '?' + query, {
  //   method: 'POST',
  // });
  const signatureResponse = await fetch(config.alchemyPay.signatureServer, {
    method: 'POST',
  });

  // Check if the response is ok
  if (!signatureResponse.ok) {
    throw new Error('Failed to get signature');
  }

  // Parse the response
  const receivedParameters = await signatureResponse.json();

  const url = sourceUrl + '?' + new URLSearchParams(receivedParameters).toString();
  console.log('url', url);
  return url;
}
