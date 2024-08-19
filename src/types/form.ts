import { FieldError, UseFormRegister } from 'react-hook-form';
import { z, ZodType } from 'zod';

export type GameFormData = {
  name: string;
  category: string;
};

export const GameSchema: ZodType<GameFormData> = z
  .object({
    name: z.string().min(3, "Please enter a valid game name. Min 3 characters."),
    category: z.string().min(4, "Please enter a valid category name.")
  });

export type ValidFieldNames = 'name' | 'category';

export type SelectOption = {
  value: string;
  label: string;
};

export type FormFieldProps = {
  type: string;
  placeholder: string;
  name: ValidFieldNames;
  register: UseFormRegister<GameFormData>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
  options?: SelectOption[];
};

export type FormSelectProps = {
  name: ValidFieldNames;
  register: UseFormRegister<GameFormData>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
  options: SelectOption[];
};
