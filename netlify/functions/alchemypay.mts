import type { Context } from '@netlify/functions';
import crypto from 'crypto';

/// The code in this file is adopted from [AlchemyPay](https://alchemypay.readme.io/v4.0.2/docs/ramp-signature-description)

function generateUniqueMerchantNo() {
  return crypto.randomUUID();
}

// Function to generate HMAC SHA256 signature
function generateSignature(
  timestamp: string,
  httpMethod: string,
  requestPath: string,
  secretKey: crypto.BinaryLike | crypto.KeyObject,
) {
  const signatureString = timestamp + httpMethod + requestPath;
  const hmac = crypto.createHmac('sha256', secretKey);
  hmac.update(signatureString);
  const signature = hmac.digest('base64');
  return encodeURIComponent(signature);
}

// Function to sort parameters and return a string to sign
function getStringToSign(params: Record<string, never>) {
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
        error: 'App secret not found',
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
  const searchParams = new URLSearchParams(req.url);
  const address = searchParams.get('address');

  const paramsToSign = {
    address: address || undefined,
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
      ...paramsToSign,
      sign: onRampSignature,
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
