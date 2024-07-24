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
import PINK from '../assets/coins/PINK.svg';
import HDX from '../assets/coins/HDX.png';
import ASTR from '../assets/coins/ASTR.png';
import BRZ from '../assets/coins/BRZ.png';
import PDEX from '../assets/coins/PDEX.png';
import BNC from '../assets/coins/BNC.png';
import USDC_axl from '../assets/coins/USDC_axl.svg';

import DefaultIcon from '../assets/coins/placeholder.png';

// The public key of Mykobo's EURC issuer account
const MYKOBO_ISSUER = 'GAQRF3UGHBT6JYQZ7YSUYCIYWAF4T2SAA5237Q5LIQYJOHHFAWDXZ7NM';

// Maps all supported Stellar assets to icons. The EURC tokens are handled separately in `getAssetIcon()`
const stellarAssets = [
  { code: 'AUDD', icon: AUDD },
  { code: 'BRL', icon: BRL },
  { code: 'NGNC', icon: NGNC },
  { code: 'TZS', icon: TZS },
  { code: 'USDC', icon: USDC },
  { code: 'XLM', icon: XLM },
];

const polkadotAssets = [
  { code: 'PEN', icon: PEN },
  { code: 'DOT', icon: DOT },
  { code: 'AMPE', icon: AMPE },
  { code: 'KSM', icon: KSM },
  { code: 'USDT', icon: USDT },
  { code: 'GLMR', icon: GLMR },
  { code: 'PINK', icon: PINK },
  { code: 'HDX', icon: HDX },
  { code: 'ASTR', icon: ASTR },
  { code: 'BRZ', icon: BRZ },
  { code: 'PDEX', icon: PDEX },
  { code: 'BNC', icon: BNC },
];

const assets = [...stellarAssets, ...polkadotAssets];

const handleSpecialAsset = (assetCode: string, assetIssuer?: string) => {
  // The EURC tokens are handled separately because they can be issued by multiple issuers
  if (assetCode.includes('EURC')) {
    if (assetIssuer === MYKOBO_ISSUER) {
      return mEURC;
    }
    return cEURC;
  }

  if (assetCode === 'USDC.axl') {
    return USDC_axl;
  }
};

const getAssetIcon = (assetCode: string, assetIssuer?: string) => {
  const specialAsset = handleSpecialAsset(assetCode, assetIssuer);

  if (specialAsset) {
    return specialAsset;
  }

  const asset = assets.find((asset) => assetCode.includes(asset.code));

  return asset?.icon || undefined;
};

export function getIcon(token: string | undefined, issuer?: string, defaultIcon = DefaultIcon) {
  if (!token) return defaultIcon;

  const icon = getAssetIcon(token, issuer);

  return icon || defaultIcon;
}
