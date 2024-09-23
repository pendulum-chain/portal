import { h } from 'preact';
import { UseFormRegisterReturn } from 'react-hook-form';
import { render } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { NumericInput } from '.';

const mockRegister: UseFormRegisterReturn = {
  name: 'testInput',
  onChange: jest.fn(),
  onBlur: jest.fn(),
  ref: jest.fn(),
};

describe('NumericInput Component', () => {
  it('should render the component', () => {
    const { getByPlaceholderText } = render(<NumericInput register={mockRegister} />);
    const inputElement = getByPlaceholderText('0.0');
    expect(inputElement).toBeInTheDocument();
  });

  it('should allow numeric input', async () => {
    const { getByPlaceholderText } = render(<NumericInput register={mockRegister} />);
    const inputElement = getByPlaceholderText('0.0') as HTMLInputElement;

    await userEvent.type(inputElement, '1234567890');
    expect(inputElement.value).toBe('1234567890');
  });

  it('should prevent non-numeric input', async () => {
    const { getByPlaceholderText } = render(<NumericInput register={mockRegister} />);
    const inputElement = getByPlaceholderText('0.0') as HTMLInputElement;

    await userEvent.type(inputElement, 'qwertyuiopasdfghjklzxcvbnm');
    expect(inputElement.value).toBe('');
  });

  it('should prevent multiple decimal points', async () => {
    const { getByPlaceholderText } = render(<NumericInput register={mockRegister} />);
    const inputElement = getByPlaceholderText('0.0') as HTMLInputElement;

    await userEvent.type(inputElement, '1.1.1,2.3,4');
    expect(inputElement.value).toBe('1.11234');
  });

  it('should replace comma with period', async () => {
    const { getByPlaceholderText } = render(<NumericInput register={mockRegister} />);
    const inputElement = getByPlaceholderText('0.0') as HTMLInputElement;

    await userEvent.type(inputElement, '1,1');
    expect(inputElement.value).toBe('1.1');
  });

  it('should work with readOnly prop', async () => {
    const { getByPlaceholderText } = render(<NumericInput register={mockRegister} readOnly={true} />);
    const inputElement = getByPlaceholderText('0.0') as HTMLInputElement;

    expect(inputElement).toHaveAttribute('readOnly');

    await userEvent.type(inputElement, '123');
    expect(inputElement.value).toBe('');
  });

  it('should apply additional styles', () => {
    const { getByPlaceholderText } = render(<NumericInput register={mockRegister} additionalStyle="extra-style" />);
    const inputElement = getByPlaceholderText('0.0');

    expect(inputElement).toHaveClass('extra-style');
  });

  it('should handle leading zeros correctly', async () => {
    const { getByPlaceholderText } = render(<NumericInput register={mockRegister} />);
    const inputElement = getByPlaceholderText('0.0') as HTMLInputElement;

    await userEvent.type(inputElement, '007');
    expect(inputElement.value).toBe('007');
  });

  it('should allow backspace and delete', async () => {
    const { getByPlaceholderText } = render(<NumericInput register={mockRegister} />);
    const inputElement = getByPlaceholderText('0.0') as HTMLInputElement;

    await userEvent.type(inputElement, '123');
    await userEvent.type(inputElement, '{backspace}');
    expect(inputElement.value).toBe('12');

    await userEvent.type(inputElement, '{delete}');
    expect(inputElement.value).toBe('12');
  });

  it('should not allow negative numbers', async () => {
    const { getByPlaceholderText } = render(<NumericInput register={mockRegister} />);
    const inputElement = getByPlaceholderText('0.0') as HTMLInputElement;

    await userEvent.type(inputElement, '-123');
    expect(inputElement.value).toBe('123');
  });

  it('should not allow more decimals than maxDecimals', async () => {
    const { getByPlaceholderText } = render(<NumericInput register={mockRegister} maxDecimals={2} />);
    const inputElement = getByPlaceholderText('0.0') as HTMLInputElement;

    await userEvent.type(inputElement, '123.45479187249871298774985');
    expect(inputElement.value).toBe('123.45');
  });

  it('should not allow more decimals than default maxDecimals', async () => {
    const { getByPlaceholderText } = render(<NumericInput register={mockRegister} />);
    const inputElement = getByPlaceholderText('0.0') as HTMLInputElement;

    await userEvent.type(inputElement, '123.4567890123456789abcgdehyu0123456.2746472.93.2.7.3.5.3');
    expect(inputElement.value).toBe('123.456789012345');
  });

  it('should allow replace any digit user wants', async () => {
    const { getByPlaceholderText } = render(<NumericInput register={mockRegister} maxDecimals={3} />);
    const inputElement = getByPlaceholderText('0.0') as HTMLInputElement;

    await userEvent.type(inputElement, '123.421');
    await userEvent.keyboard('{arrowleft}{arrowleft}{arrowleft}{arrowleft}{arrowleft}{backspace}');
    // The keyboard is being reset to the end of the input, so we need to move it back to the left
    await userEvent.keyboard('{arrowleft}{arrowleft}{arrowleft}{arrowleft}{arrowleft}4');
    expect(inputElement.value).toBe('143.421');

    await userEvent.keyboard('{arrowleft}{arrowleft}{backspace}');
    await userEvent.keyboard('{arrowleft}{arrowleft}7');
    expect(inputElement.value).toBe('143.721');

    await userEvent.keyboard('{arrowleft}{arrowleft}{arrowleft}{backspace}');
    await userEvent.keyboard('{arrowleft}{arrowleft}{arrowleft}9');
    expect(inputElement.value).toBe('1439721');
  });

  it('should initialize with default value', () => {
    const { getByPlaceholderText } = render(<NumericInput register={mockRegister} defaultValue="123.45" />);
    const inputElement = getByPlaceholderText('0.0') as HTMLInputElement;

    expect(inputElement.value).toBe('123.45');
  });

  it('should remain unchanged on invalid input', async () => {
    const { getByPlaceholderText } = render(<NumericInput register={mockRegister} defaultValue="123.45" />);
    const inputElement = getByPlaceholderText('0.0') as HTMLInputElement;

    await userEvent.type(inputElement, '!!!');
    expect(inputElement.value).toBe('123.45');
  });

  it('should handle paste invalid characters', async () => {
    const { getByPlaceholderText } = render(<NumericInput register={mockRegister} />);
    const inputElement = getByPlaceholderText('0.0') as HTMLInputElement;

    inputElement.focus();
    await userEvent.paste('123.4567890123456789abcgdehyu0123456.2746472.93.2.7.3.5.3');
    expect(inputElement.value).toBe('123.456789012345');
  });

  it('Should not cut the number if user is trying to type more than one "."', async () => {
    const { getByPlaceholderText } = render(<NumericInput register={mockRegister} />);
    const inputElement = getByPlaceholderText('0.0') as HTMLInputElement;

    await userEvent.type(inputElement, '0.23');
    await userEvent.keyboard('{arrowleft}.');
    expect(inputElement.value).toBe('0.23');
  });

  it('Should not cut the number and set properly the new postion of "." in the number', async () => {
    const { getByPlaceholderText } = render(<NumericInput register={mockRegister} />);
    const inputElement = getByPlaceholderText('0.0') as HTMLInputElement;

    await userEvent.type(inputElement, '12.34');
    await userEvent.keyboard('{arrowleft}{arrowleft}{arrowleft}{arrowleft}.');
    expect(inputElement.value).toBe('1.234');
  });

  it('should accept only one "."', async () => {
    const { getByPlaceholderText } = render(<NumericInput register={mockRegister} />);
    const inputElement = getByPlaceholderText('0.0') as HTMLInputElement;

    await userEvent.type(inputElement, '...........');
    expect(inputElement.value).toBe('.');
  });
});
