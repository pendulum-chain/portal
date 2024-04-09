import { TenantName } from '../../models/Tenant';
import { LottieOptions } from './links';

import AmpeLottieText from '../../assets/spacewalk/AMPE_StellarBridgeToSpacewalk_Text.json';
import AmpeLottieInterpolation from '../../assets/spacewalk/AMPE_StellarBridgeToSpacewalk_Interpolation.json';
import PenLottieText from '../../assets/spacewalk/PEN_StellarBridgeToSpacewalk_Text.json';
import PenLottieInterpolation from '../../assets/spacewalk/PEN_StellarBridgeToSpacewalk_Interpolation.json';

const SPACEWALK_TEXT_HEIGHT = 20;
const SPACEWALK_TEXT_WIDTH = 96;

export const getSpacewalkText = (tenantName: TenantName | undefined): LottieOptions => ({
  lottieOptions: {
    loop: false,
    autoplay: false,
    animationData: tenantName === TenantName.Pendulum ? PenLottieText : AmpeLottieText,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  },
  componentOptions: {
    height: SPACEWALK_TEXT_HEIGHT,
    width: SPACEWALK_TEXT_WIDTH,
    style: { margin: 0 },
  },
});

const SPACEWALK_ICON_HEIGHT = 32;
const SPACEWALK_ICON_WIDTH = 32;

export const getSpacewalkInterpolation = (tenantName: TenantName | undefined): LottieOptions => ({
  lottieOptions: {
    loop: false,
    autoplay: false,
    animationData: tenantName === TenantName.Pendulum ? PenLottieInterpolation : AmpeLottieInterpolation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  },
  componentOptions: {
    height: SPACEWALK_ICON_HEIGHT,
    width: SPACEWALK_ICON_WIDTH,
    style: { margin: 0 },
  },
});
