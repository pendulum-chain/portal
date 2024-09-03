/// The code in this file is adopted from [AlchemyPay](https://alchemypay.readme.io/v4.0.2/docs/ramp-signature-description)

import type { Context } from '@netlify/functions';
import crypto from 'crypto';

// Environment variables
const APP_ID = Netlify.env.get('ALCHEMYPAY_APP_ID');
const APP_SECRET = Netlify.env.get('ALCHEMYPAY_APP_SECRET');

function uuidToNumber(uuid: string) {
  // Remove hyphens from the UUID
  const cleanUUID = uuid.replace(/-/g, '');
  // Convert the cleaned UUID to a BigInt
  const bigIntValue = BigInt(`0x${cleanUUID}`);
  // Convert BigInt to a number (if within safe range)
  return Number(bigIntValue % BigInt(Number.MAX_SAFE_INTEGER));
}

function generateUniqueMerchantNo() {
  const uuid = crypto.randomUUID();
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

  if (!APP_SECRET) {
    return Response.json(
      {
        error: 'Internal server error',
      },
      {
        status: 500,
      },
    );
  }

  const merchantOrderNo = generateUniqueMerchantNo();

  // Extract query parameters
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const address = searchParams.get('address') || undefined;
  const showTable = searchParams.get('showTable') || undefined;
  const redirectURL = searchParams.get('redirectURL') || undefined;

  const paramsToSign = {
    address: address,
    showTable: showTable,
    redirectURL: redirectURL,

    crypto: 'PEN',
    merchantOrderNo: merchantOrderNo,
    network: 'PEN',
    timestamp: timestamp,
    appId: APP_ID,
  };

  const rawDataToSign = getStringToSign(paramsToSign as never);
  const requestPathWithParams = onRampRequestPath + '?' + rawDataToSign;
  const onRampSignature = generateSignature(timestamp, onRampHttpMethod, requestPathWithParams, APP_SECRET);

  return Response.json(
    {
      sign: onRampSignature,
      requestParams: rawDataToSign,
    },
    {
      status: 200,
    },
  );
};
