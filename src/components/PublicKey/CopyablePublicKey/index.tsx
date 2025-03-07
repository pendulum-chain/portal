import { ClickablePublicKey, ClickablePublicKeyProps } from '../ClickablePublicKey';
import { useClipboard } from '../../../hooks/useClipboard';
import CopyIcon from '../../../assets/CopyIcon';
import { encodeAddress } from '@polkadot/util-crypto';
import { useState, useRef, useEffect } from 'react';
import { useNodeInfoState } from '../../../NodeInfoProvider';

interface CopyablePublicKeyProps extends ClickablePublicKeyProps {
  onClick?: () => void;
  publicKey: string;
}

interface CopyablePublicKeyStellarProps extends ClickablePublicKeyProps {
  onClick?: () => void;
  publicKey: string;
}

interface AddressTooltipProps extends CopyablePublicKeyProps {
  ss58FormatOld?: number;
  onClose: () => void;
}

const AddressTooltip: React.FC<AddressTooltipProps> = ({
  publicKey,
  ss58FormatOld,
  onClick,
  onClose,
  ...props
}) => {
  const clipboard = useClipboard();
  const addresses = [{label: "New format" , address: encodeAddress(publicKey, 0)}, {label: "Old format", address: encodeAddress(publicKey, ss58FormatOld)}];

  const handleClick = (address: string) => {
    onClick && onClick();
    clipboard.copyToClipboard(address);
  };

  return (
    <div className="bg-white border border-gray-300 rounded p-2 shadow-md w-max whitespace-nowrap">
      {addresses.map(({ label, address }, idx) => (
        <div key={idx} className="flex items-center justify-between mb-1">
          <span className="text-sm text-gray-600 whitespace-nowrap pr-4">{label}</span>
          <ClickablePublicKey
            {...{ ...props, publicKey: address }}
            onClick={() => handleClick(address)}
            icon={<CopyIcon className="h-4 w-4" />}
          />
        </div>
      ))}
      <div className="mt-2">
        <a href="https://wiki.polkadot.network/docs/learn-accounts#unified-address-format "  target="_blank" className="underline text-sm whitespace-nowrap" rel="noreferrer">
          Why am I seeing two formats?
        </a>
      </div>
    </div>
  );
};

export const CopyablePublicKey = ({ onClick, publicKey, ...props }: CopyablePublicKeyProps) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { state: nodeState }= useNodeInfoState()
  const ss58FormatOld = nodeState.ss58Format;

  const toggleTooltip = () => {
    setTooltipOpen((prev) => !prev);
    onClick && onClick();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setTooltipOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="inline-block" ref={containerRef}>
      {tooltipOpen && (
        <div className="relative">
          <div className="absolute top-full left-0 mt-2 z-50 transform -translate-x-1/2">
            <AddressTooltip
              publicKey={publicKey}
              onClose={() => setTooltipOpen(false)}
              onClick={onClick}
              ss58FormatOld={ss58FormatOld}
              {...props}
            />
          </div>
        </div> 
      )}
      <ClickablePublicKey
        {...{ ...props, publicKey: publicKey ? encodeAddress(publicKey, 0) : publicKey }}
        onClick={toggleTooltip}
        icon={<CopyIcon className="h-4 w-4" />}
      />
    </div>
  );
};

export const CopyablePublicKeyStellar = ({ onClick, publicKey, ...props }: CopyablePublicKeyStellarProps) => {
  const clipboard = useClipboard();

  const handleClick = () => {
    onClick && onClick();
    clipboard.copyToClipboard(publicKey);
  };

  return (
    <ClickablePublicKey {...{ ...props, publicKey }} onClick={handleClick} icon={<CopyIcon className="h-4 w-4" />} />
  );
};