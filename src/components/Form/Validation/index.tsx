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
      {keys.map((key, i) => (errors[key] && errors[key]?.message ? <li key={i}>{errors[key]?.message}</li> : null))}
    </ul>
  );
};
export default Validation;
