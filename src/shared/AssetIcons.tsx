import AMPE from '../assets/coins/AMPE.png';
import AUDD from '../assets/coins/AUDD.png';
import BRL from '../assets/coins/BRL.png';
import DOT from '../assets/coins/DOT.png';
import EURC from '../assets/coins/EURC.png';
import KSM from '../assets/coins/KSM.png';
import NGNC from '../assets/coins/NGNC.png';
import PEN from '../assets/coins/PEN.png';
import TZS from '../assets/coins/TZS.png';
import USDC from '../assets/coins/USDC.png';
import USDT from '../assets/coins/USDT.png';
import XLM from '../assets/coins/XLM.png';

import DefaultIcon from '../assets/coins/placeholder.png';

type IconMap = {
  [key: string]: string;
};

const icons: IconMap = {
  'AUDD.s': AUDD,
  'BRL.s': BRL,
  'EURC.s': EURC,
  'NGNC.s': NGNC,
  'TZS.s': TZS,
  'USDC.s': USDC,
  'XLM.s': XLM,
  AMPE,
  AUDD,
  BRL,
  DOT,
  EURC,
  KSM,
  NGNC,
  PEN,
  TZS,
  USDC,
  USDT,
  XLM,
};

export function getIcon(token: string | undefined) {
  return token && Object.keys(icons).includes(token) ? icons[token] : DefaultIcon;
}
