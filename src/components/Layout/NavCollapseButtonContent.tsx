import React from 'react';
import Lottie from 'react-lottie';

import { LinkItem, isLottieOptions } from './links';

interface NavButtonContentProps {
  item: LinkItem;
  isPlaying: boolean;
}

export const NavCollapseButtonContent: React.FC<NavButtonContentProps> = ({ item, isPlaying }) => {
  return (
    <>
      {isLottieOptions(item.prefix) ? (
        <Lottie options={item.prefix.lottieOptions} isStopped={!isPlaying} {...item.prefix.componentOptions} />
      ) : (
        item.prefix
      )}
      {isLottieOptions(item.title) ? (
        <span>
          <Lottie options={item.title.lottieOptions} isStopped={!isPlaying} {...item.title.componentOptions} />
        </span>
      ) : (
        <span>{item.title}</span>
      )}
      {item.suffix}
    </>
  );
};
