import { FieldErrors } from 'react-hook-form';

export interface ValidationProps {
  errors?: FieldErrors;
  className?: string;
}

const Validation = ({ errors = {}, className }: ValidationProps): JSX.Element | null => {
  const keys = Object.keys(errors);
  if (keys.length === 0) return null;
  return (
    <ul className={`text-sm text-red-400 ${className}`}>
      {/** @ts-expect-error @todo remove */}
      {keys.map((key) => (errors[key] && errors[key]?.message ? <li key={key}>{errors[key]?.message}</li> : null))}
    </ul>
  );
};
export default Validation;
