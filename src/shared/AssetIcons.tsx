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
];

const getAssetIcon = (assetCode: string, assetIssuer: string, assets: { code: string; icon: string }[]) => {
  if (assetCode.includes('EURC')) {
    return assetIssuer === MYKOBO_ISSUER ? mEURC : cEURC;
  }

  const asset = assets.find((asset) => assetCode.includes(asset.code));

  return asset?.icon || undefined;
};

const getStellarAssetIcon = (assetCode: string, assetIssuer?: string) => {
  return getAssetIcon(assetCode, assetIssuer || '', stellarAssets);
};

const getPolkadotAssetIcon = (assetCode: string) => {
  return getAssetIcon(assetCode, '', polkadotAssets);
};

export function getIcon(token: string | undefined, issuer?: string, defaultIcon = DefaultIcon) {
  if (!token) return defaultIcon;

  const polkadotIcon = getPolkadotAssetIcon(token);
  const stellarIcon = getStellarAssetIcon(token, issuer);

  return polkadotIcon || stellarIcon || defaultIcon;
}
