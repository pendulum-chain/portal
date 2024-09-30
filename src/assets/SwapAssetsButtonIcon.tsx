import useSwitchChain from '../hooks/useSwitchChain';

enum ThemeNames {
  Amplitude = 'AMPLITUDE',
  Pendulum = 'PENDULUM',
}

interface SvgElements {
  arrow: string;
  circle: string;
  arrows: string;
}

const themeColors: Record<ThemeNames, SvgElements> = {
  [ThemeNames.Amplitude]: {
    arrow: '#4EE59A',
    circle: '#096F6B',
    arrows: '#8EBDBB',
  },
  [ThemeNames.Pendulum]: {
    arrow: '#1DE7DF',
    circle: '#32253E',
    arrows: '#907EA0',
  },
};

export const SwapAssetsButtonIcon = () => {
  const { currentTenant } = useSwitchChain();

  const currentTheme = currentTenant === 'pendulum' ? ThemeNames.Pendulum : ThemeNames.Amplitude;

  return (
    <svg
      width="37"
      height="30"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 37 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g className="origin-center transition hover:scale-90">
        <path
          d="M18.5393 27.0103C25.1667 27.0103 30.5393 21.6377 30.5393 15.0103C30.5393 8.38284 25.1667 3.01025 18.5393 3.01025C11.9119 3.01025 6.53931 8.38284 6.53931 15.0103C6.53931 21.6377 11.9119 27.0103 18.5393 27.0103Z"
          fill={themeColors[currentTheme].circle}
        />
        <path d="M12.1893 13.1602L18.5393 19.5102L24.8893 13.1602H12.1893Z" fill={themeColors[currentTheme].arrow} />
      </g>
      <path
        d="M8.15933 5.97023L9.29933 0.110229L3.44933 1.28023L5.18933 3.01023C2.20933 6.31023 0.559326 10.5302 0.559326 15.0102C0.559326 19.8102 2.42933 24.3302 5.82933 27.7202L7.23933 26.3102C4.21933 23.2902 2.55933 19.2802 2.55933 15.0102C2.55933 11.0602 3.99933 7.34023 6.59933 4.42023L8.15933 5.97023Z"
        fill={themeColors[currentTheme].arrows}
      />
      <path
        d="M36.9193 15.0102C36.9193 10.2102 35.0493 5.69023 31.6493 2.30023L30.2393 3.71023C33.2593 6.73023 34.9193 10.7402 34.9193 15.0102C34.9193 18.9702 33.4793 22.6902 30.8593 25.6202L29.3093 24.0802L28.1693 29.9402L34.0193 28.7702L32.2693 27.0302C35.2593 23.7202 36.9093 19.5002 36.9093 15.0102H36.9193Z"
        fill={themeColors[currentTheme].arrows}
      />
    </svg>
  );
};
