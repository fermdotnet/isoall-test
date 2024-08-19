import React from 'react';
import { FormSelectProps } from '@/types/form';

const FormSelect: React.FC<FormSelectProps> = ({ name, register, error, valueAsNumber, options }) => (
  <div className="form-input">
    <select {...register(name, { valueAsNumber })}>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {error && <span className="error-message">{error.message}</span>}
  </div>
);

export default FormSelect;
