import { FC } from 'react';
import Lottie, { LottieProps } from 'react-lottie';

import { LinkItem, isLottieOptions } from './links';

interface NavButtonContentProps {
  item: LinkItem;
  isPlaying: boolean;
}

const LottieComponent = Lottie as unknown as FC<LottieProps>;

export const NavCollapseButtonContent: FC<NavButtonContentProps> = ({ item, isPlaying }) => (
  <>
    {isLottieOptions(item.prefix) ? (
      <LottieComponent
        options={item.prefix.lottieOptions}
        isStopped={!isPlaying}
        isClickToPauseDisabled={true}
        {...item.prefix.componentOptions}
      />
    ) : (
      item.prefix
    )}
    {isLottieOptions(item.title) ? (
      <span>
        <LottieComponent
          options={item.title.lottieOptions}
          isStopped={!isPlaying}
          isClickToPauseDisabled={true}
          {...item.title.componentOptions}
        />
      </span>
    ) : (
      <span>{item.title}</span>
    )}
    {item.suffix}
  </>
);
