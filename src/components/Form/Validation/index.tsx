import { FieldError, FieldErrors } from 'react-hook-form';

export interface ValidationProps {
  errors?: FieldErrors;
  className?: string;
}

export const Validation = ({ errors = {}, className = '' }: ValidationProps) => {
  const errorEntries = Object.entries(errors);

  if (errorEntries.length === 0) return <></>;

  return (
    <ul className={`text-sm text-red-400 ${className}`}>
      {errorEntries.map(([field, error]) => {
        const message = (error as FieldError)?.message;
        return typeof message === 'string' ? <li key={field}>{message}</li> : null;
      })}
    </ul>
  );
};
