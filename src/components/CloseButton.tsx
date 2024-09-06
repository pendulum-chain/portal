import { Button } from 'react-daisyui';
import { ButtonProps } from 'react-daisyui/dist/Button/Button';
import { CloseIcon } from '../assets/CloseIcon';

export const CloseButton = (props: ButtonProps) => (
  <Button
    color="ghost"
    size="sm"
    shape="circle"
    className="h-[2.25rem] w-[2.25rem] text-xl font-thin !leading-5"
    style={{ color: 'var(--secondary)' }}
    type="button"
    {...props}
  >
    <span className="text-[1.25em]">
      <CloseIcon />
    </span>
  </Button>
);
