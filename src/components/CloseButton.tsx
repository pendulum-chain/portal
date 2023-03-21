import { Button } from 'react-daisyui';
import { ButtonProps } from 'react-daisyui/dist/Button/Button';

export const CloseButton = (props: ButtonProps) => {
  return (
    <Button
      color="ghost"
      size="md"
      shape="circle"
      className="absolute right-4 top-4 text-xl font-thin"
      style={{ color: 'var(--secondary)' }}
      {...props}
    >
      ⨯
    </Button>
  );
};
