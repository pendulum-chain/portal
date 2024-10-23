import { useState } from 'preact/hooks';
import { SwapAssetsButtonIcon } from '../../assets/SwapAssetsButtonIcon';

interface SwapAssetsButtonProps {
  onClick?: () => void;
}

export const SwapAssetsButton = ({ onClick }: SwapAssetsButtonProps) => {
  const [isRotated, setIsRotated] = useState(false);
  const toggleRotation = () => setIsRotated(!isRotated);

  const onButtonClick = () => {
    toggleRotation();
    onClick && onClick();
  };

  return (
    <button type="button" onClick={onButtonClick}>
      <div className={`flex cursor-pointer justify-center duration-300 ${isRotated ? 'rotate-180' : ''}`}>
        <SwapAssetsButtonIcon />
      </div>
      <span className="visually-hidden">Swap selected assets</span>
    </button>
  );
};
