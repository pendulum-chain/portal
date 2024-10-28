import { UseFormRegisterReturn } from 'react-hook-form';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NumericInput } from '.';
import { handleOnPasteNumericInput } from './helpers';
import { ClipboardEvent } from 'react';

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

  it('Should not cut the number and do not move . position', async () => {
    const { getByPlaceholderText } = render(<NumericInput register={mockRegister} />);
    const inputElement = getByPlaceholderText('0.0') as HTMLInputElement;

    await userEvent.type(inputElement, '12.34');
    await userEvent.keyboard('{arrowleft}{arrowleft}{arrowleft}{arrowleft}.');
    expect(inputElement.value).toBe('12.34');
  });

  it('Should not paste the number if more than one .', async () => {
    const { getByPlaceholderText } = render(<NumericInput register={mockRegister} />);
    const inputElement = getByPlaceholderText('0.0') as HTMLInputElement;

    await userEvent.paste('12.34.56');
    expect(inputElement.value).toBe('');
  });

  it('should accept only one "."', async () => {
    const { getByPlaceholderText } = render(<NumericInput register={mockRegister} />);
    const inputElement = getByPlaceholderText('0.0') as HTMLInputElement;

    await userEvent.type(inputElement, '...........');
    expect(inputElement.value).toBe('.');
  });

  it('should paste properly', async () => {
    const { getByPlaceholderText } = render(<NumericInput register={mockRegister} maxDecimals={3} />);
    const inputElement = getByPlaceholderText('0.0') as HTMLInputElement;

    await userEvent.type(inputElement, '123');
    await userEvent.keyboard('{arrowleft}{arrowleft}{arrowleft}');
    await userEvent.paste('4');
    expect(inputElement.value).toBe('4123');
  });
});

describe('NumericInput onPaste should sanitize the user input', () => {
  const testCases = [
    { input: '1.......4.....2', maxLength: 8, expected: '1.42' },
    { input: '12....34.....56', maxLength: 8, expected: '12.3456' },
    { input: '....56789...', maxLength: 5, expected: '.56789' },
    { input: '1.23..4..56.', maxLength: 6, expected: '1.23456' },
    { input: '1.....2', maxLength: 8, expected: '1.2' },
    { input: '123..4...56.7', maxLength: 7, expected: '123.4567' },
    { input: 'a.b.c.123.4.def56', maxLength: 8, expected: '.123456' },
    { input: '12abc34....def567', maxLength: 2, expected: '1234.56' },
    { input: '.....a.b.c......', maxLength: 8, expected: '.' },
    { input: '12.....3..4..5abc6', maxLength: 7, expected: '12.3456' },
    { input: '1a2b3c4d5e.1234567', maxLength: 4, expected: '12345.1234' },
    { input: '12abc@#34..def$%^567', maxLength: 2, expected: '1234.56' },
    { input: '....!@#$$%^&*((', maxLength: 8, expected: '.' },
    { input: '123....abc.def456ghi789', maxLength: 4, expected: '123.4567' },
    { input: '00.00123...4', maxLength: 4, expected: '00.0012' },
    { input: '.1...2.67.865', maxLength: 3, expected: '.126' },
    { input: '123abc...', maxLength: 6, expected: '123.' },
  ];

  test.each(testCases)(
    'should sanitize the pasted input with maxLength (decimal)',
    ({ input, maxLength, expected }) => {
      const mockEvent = {
        target: {
          setSelectionRange: jest.fn(),
          value: '',
        },
        preventDefault: jest.fn(),
        clipboardData: {
          getData: jest.fn().mockReturnValue(input),
        },
      } as unknown as ClipboardEvent;

      expect(handleOnPasteNumericInput(mockEvent, maxLength)).toBe(expected);
    },
  );
});
