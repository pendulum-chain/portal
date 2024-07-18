import AMPE from '../assets/coins/AMPE.png';
import AUDD from '../assets/coins/AUDD.png';
import BRL from '../assets/coins/BRL.png';
import DOT from '../assets/coins/DOT.png';
import mEURC from '../assets/coins/mEURC.png';
import cEURC from '../assets/coins/cEURC.png';
import KSM from '../assets/coins/KSM.png';
import NGNC from '../assets/coins/NGNC.png';
import PEN from '../assets/coins/PEN.png';
import TZS from '../assets/coins/TZS.png';
import USDC from '../assets/coins/USDC.png';
import USDT from '../assets/coins/USDT.png';
import XLM from '../assets/coins/XLM.png';
import GLMR from '../assets/coins/GLMR.png';

import DefaultIcon from '../assets/coins/placeholder.png';

// The public key of Mykobo's EURC issuer account
const MYKOBO_ISSUER = 'GAQRF3UGHBT6JYQZ7YSUYCIYWAF4T2SAA5237Q5LIQYJOHHFAWDXZ7NM';

const getStellarAssetIcon = (assetCode: string, assetIssuer: string) => {
  if (assetCode.includes('AUDD')) {
    return AUDD;
  } else if (assetCode.includes('BRL')) {
    return BRL;
  } else if (assetCode.includes('EURC')) {
    console.log('Trying to get icon for EURC', assetCode, assetIssuer);
    if (assetIssuer === MYKOBO_ISSUER) {
      return mEURC;
    } else {
      // Use the Circle EURC icon for all other EURC issuers
      return cEURC;
    }
  } else if (assetCode.includes('NGNC')) {
    return NGNC;
  } else if (assetCode.includes('TZS')) {
    return TZS;
  } else if (assetCode.includes('USDC')) {
    return USDC;
  } else if (assetCode.includes('XLM')) {
    return XLM;
  }

  return undefined;
};

const getPolkadotAssetIcon = (assetCode: string) => {
  if (assetCode.includes('PEN')) {
    return PEN;
  } else if (assetCode.includes('DOT')) {
    return DOT;
  } else if (assetCode.includes('AMPE')) {
    return AMPE;
  } else if (assetCode.includes('KSM')) {
    return KSM;
  } else if (assetCode.includes('USDT')) {
    return USDT;
  } else if (assetCode.includes('GLMR')) {
    return GLMR;
  }

  return undefined;
};

export function getIcon(token: string | undefined, issuer?: string, defaultIcon = DefaultIcon) {
  const polkadotIcon = getPolkadotAssetIcon(token || '');
  const stellarIcon = getStellarAssetIcon(token || '', issuer || '');

  return polkadotIcon || stellarIcon || defaultIcon;
}
