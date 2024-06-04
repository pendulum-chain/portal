import { TenantName } from '../../models/Tenant';
import { LottieOptions } from './links';

import AmpeLottieText from '../../assets/spacewalk/AMPE_StellarBridgeToSpacewalk_Text.json';
import AmpeLottieInterpolation from '../../assets/spacewalk/AMPE_StellarBridgeToSpacewalk_Interpolation.json';
import PenLottieText from '../../assets/spacewalk/PEN_StellarBridgeToSpacewalk_Text.json';
import PenLottieInterpolation from '../../assets/spacewalk/PEN_StellarBridgeToSpacewalk_Interpolation.json';

const createLottieOptions = (animationData: unknown, height: number, width: number): LottieOptions => ({
  lottieOptions: {
    loop: false,
    autoplay: false,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  },
  componentOptions: {
    height,
    width,
    style: { margin: 0 },
  },
});

const SPACEWALK_TEXT_HEIGHT = 20;
const SPACEWALK_TEXT_WIDTH = 96;

export const getSpacewalkText = (tenantName: TenantName | undefined): LottieOptions => {
  const animationData = tenantName === TenantName.Pendulum ? PenLottieText : AmpeLottieText;
  return createLottieOptions(animationData, SPACEWALK_TEXT_HEIGHT, SPACEWALK_TEXT_WIDTH);
};

const SPACEWALK_ICON_HEIGHT = 32;
const SPACEWALK_ICON_WIDTH = 32;

export const getSpacewalkInterpolation = (tenantName: TenantName | undefined): LottieOptions => {
  const animationData = tenantName === TenantName.Pendulum ? PenLottieInterpolation : AmpeLottieInterpolation;
  return createLottieOptions(animationData, SPACEWALK_ICON_HEIGHT, SPACEWALK_ICON_WIDTH);
};
