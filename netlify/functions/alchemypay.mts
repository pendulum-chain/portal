import type { Context } from '@netlify/functions';
import crypto from 'crypto';

/// The code in this file is adopted from [AlchemyPay](https://alchemypay.readme.io/v4.0.2/docs/ramp-signature-description)

function uuidToNumber(uuid: string) {
  // Remove hyphens from the UUID
  const cleanUUID = uuid.replace(/-/g, '');

  // Convert the cleaned UUID to a BigInt
  const bigIntValue = BigInt(`0x${cleanUUID}`);

  // Convert BigInt to a number (if within safe range)
  const uniqueNumber = Number(bigIntValue % BigInt(Number.MAX_SAFE_INTEGER));

  return uniqueNumber;
}

function generateUniqueMerchantNo() {
  const uuid = crypto.randomUUID();
  // Remove dashes (-) from UUID
  return uuidToNumber(uuid);
}

// Function to generate HMAC SHA256 signature
function generateSignature(
  timestamp: string,
  httpMethod: string,
  requestPath: string,
  secretKey: crypto.BinaryLike | crypto.KeyObject,
) {
  const signatureString = timestamp + httpMethod + requestPath;
  console.log('signing string', signatureString);
  const hmac = crypto.createHmac('sha256', secretKey);
  hmac.update(signatureString);
  const signature = hmac.digest('base64');
  return encodeURIComponent(signature);
}

// Function to sort parameters and return a string to sign
function getStringToSign(params: Record<string, never>) {
  // Filter undefined values from params
  Object.keys(params).forEach((key) => params[key] === undefined && delete params[key]);

  const sortedKeys = Object.keys(params).sort();
  const s2s = sortedKeys
    .map((key) => {
      const value = params[key];
      if (Array.isArray(value) || value === '') {
        return null;
      }
      return `${key}=${value}`;
    })
    .filter(Boolean)
    .join('&');
  return s2s;
}

export default async (req: Request, context: Context) => {
  const onRampHttpMethod = 'GET';
  const onRampRequestPath = '/index/rampPageBuy';
  const timestamp = String(Date.now());

  const appId = Netlify.env.get('ALCHEMYPAY_APP_ID');
  const appSecret = Netlify.env.get('ALCHEMYPAY_APP_SECRET');

  if (!appSecret) {
    return Response.json(
      {
        error: 'Internal server error',
      },
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*', // or specify your domain
          'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      },
    );
  }

  const merchantOrderNo = generateUniqueMerchantNo();
  // Extract from query parameters
  console.log('req', req.url);
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const address = searchParams.get('address') || undefined;
  const showTable = searchParams.get('showTable') || undefined;
  const redirectURL = searchParams.get('redirectURL') || undefined;

  console.log('searchParams', searchParams);

  console.log('redirectURL', redirectURL);

  const paramsToSign = {
    address: address,
    showTable: showTable,
    redirectURL: redirectURL,

    crypto: 'PEN',
    merchantOrderNo: merchantOrderNo,
    network: 'PEN',
    timestamp: timestamp,
    appId: appId,
  };

  const rawDataToSign = getStringToSign(paramsToSign as never);
  const requestPathWithParams = onRampRequestPath + '?' + rawDataToSign;
  const onRampSignature = generateSignature(timestamp, onRampHttpMethod, requestPathWithParams, appSecret);

  return Response.json(
    {
      sign: onRampSignature,
      requestParams: rawDataToSign,
    },
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // or specify your domain
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    },
  );
};
