import Lottie from 'react-lottie';

import { LinkItem, isLottieOptions } from './links';
import { FC } from 'preact/compat';

interface NavButtonContentProps {
  item: LinkItem;
  isPlaying: boolean;
}

export const NavCollapseButtonContent: FC<NavButtonContentProps> = ({ item, isPlaying }) => (
  <>
    {isLottieOptions(item.prefix) ? (
      <Lottie
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
        <Lottie
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
