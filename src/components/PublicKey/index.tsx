import React from 'react';
import { useClipboard } from '../../hooks/userinterface';
import { Button } from 'react-daisyui';
import { DocumentDuplicateIcon } from '@heroicons/react/20/solid';

type Variant = 'full' | 'short' | 'shorter';

function getDigitCounts(variant?: Variant) {
  if (variant === 'short') {
    return {
      leading: 6,
      trailing: 6,
    };
  } else {
    return {
      leading: 4,
      trailing: 4,
    };
  }
}

export function shortenName(name: string, intendedLength: number) {
  if (name.length <= intendedLength) {
    return name;
  } else {
    return (
      name.substr(0, intendedLength - 3).trim() +
      '…' +
      name
        .substr(intendedLength - 3)
        .substr(-3)
        .trim()
    );
  }
}

interface PublicKeyProps {
  publicKey: string;
  variant?: Variant;
  style?: React.CSSProperties;
  showRaw?: boolean;
}

// tslint:disable-next-line no-shadowed-variable
export const PublicKey = React.memo(function PublicKey(props: PublicKeyProps) {
  const { variant = 'full' } = props;
  const digits = getDigitCounts(props.variant);

  const style: React.CSSProperties = {
    display: 'inline',
    fontSize: 'inherit',
    fontWeight: 'bold',
    userSelect: 'text',
    WebkitUserSelect: 'text',
    whiteSpace: variant !== 'full' ? 'pre' : undefined,
    ...props.style,
  };

  return (
    <span style={style}>
      {props.variant === "full" || !props.variant
        ? props.publicKey
        : props.publicKey.substr(0, digits.leading) +
        "…" +
        props.publicKey.substr(-digits.trailing)}
    </span>
  );
});

interface AddressProps {
  publicKey: string;
  variant?: Variant;
  style?: React.CSSProperties;
  icon?: JSX.Element;
  onClick?: () => void;
}

// tslint:disable-next-line no-shadowed-variable
export const ClickableAddress = React.memo(function ClickableAddress(
  props: AddressProps,
) {
  return (
    <Button
      color="ghost"
      onClick={props.onClick}
      style={{
        fontSize: 'inherit',
        fontWeight: 'inherit',
        textAlign: 'inherit',
      }}
    >
      {props.icon ? (
        <>
          {props.icon}
          &nbsp;
        </>
      ) : null}
      <PublicKey {...props} />
    </Button>
  );
});

interface CopyableAddressProps extends AddressProps {
  onClick?: () => void;
}

// tslint:disable-next-line no-shadowed-variable
export const CopyableAddress = React.memo(function CopyableAddress(
  props: CopyableAddressProps,
) {
  const { onClick } = props;
  const clipboard = useClipboard();

  const handleClick = React.useCallback(() => {
    if (onClick) {
      onClick();
    }
    clipboard.copyToClipboard(props.publicKey);
  }, [clipboard, onClick, props.publicKey]);

  return (
    <ClickableAddress
      {...props}
      onClick={handleClick}
      icon={<DocumentDuplicateIcon className="w-5 h-5" />}
    />
  );
});
