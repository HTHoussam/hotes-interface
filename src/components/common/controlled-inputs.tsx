import { Checkbox, CheckboxProps, MenuItem, Select, SelectProps, TextField, TextFieldProps } from '@mui/material';
import { Control, Controller, FieldValues, UseControllerProps } from 'react-hook-form';
import { SecondaryDropDown } from '.';

/**
 * Textfield Controlled form input
 */
interface ControlledFormInputProps<T extends FieldValues> {
  controllerProps: UseControllerProps<T>;
  textFieldProps: TextFieldProps;
}

export const ControlledFormInput = <T extends Record<string, any>>({
  controllerProps,
  textFieldProps,
}: ControlledFormInputProps<T>) => {
  return (
    <Controller
      {...controllerProps}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          helperText={error ? error.message : null}
          size="small"
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          variant="outlined"
          {...textFieldProps}
        />
      )}
    />
  );
};
/**
 * Dropdown Controlled input using MUI Select
 */
interface FormInputDropdownProps<T extends FieldValues> extends UseControllerProps<T> {
  selectProps?: SelectProps<T>;
  options: { label: string; value: string }[];
  control: Control<T>;
}

export const FormInputDropdown = <T extends FieldValues>({
  selectProps,
  options,
  control,
  ...controllerProps
}: FormInputDropdownProps<T>): React.ReactElement => {
  const generateSingleOptions = () => {
    return options.map((option) => {
      return (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      );
    });
  };

  return (
    <Controller
      render={({ field: { onChange, value } }) => (
        <Select onChange={onChange} value={value} {...selectProps}>
          {generateSingleOptions()}
        </Select>
      )}
      {...controllerProps}
      control={control}
    />
  );
};

/**
 * Dropdown Controlled input using Bootstrap dropdown
 */
interface FormInputDropdownBootstrapProps<T extends FieldValues> extends UseControllerProps<T> {
  options: { label: string; value: string }[];
  title: string;
  control: Control<T>;
}

export const FormInputDropdownBootstrap = <T extends Record<string, any>>({
  options,
  title,
  control,
  ...controllerProps
}: FormInputDropdownBootstrapProps<T>): React.ReactElement => {
  return (
    <Controller
      render={({ field: { onChange, value } }) => (
        <SecondaryDropDown options={options} value={value} title={title} handleChange={onChange} />
      )}
      {...controllerProps}
      control={control}
    />
  );
};

/**
 * Checkbox Controlled input
 */

interface FormCheckboxControlledProps<T extends FieldValues> {
  controllerProps: UseControllerProps<T>;
  checkBoxProps: CheckboxProps;
}

export const FormCheckboxControlled = <T extends Record<string, any>>({
  controllerProps,
  checkBoxProps,
}: FormCheckboxControlledProps<T>) => {
  return (
    <Controller
      {...controllerProps}
      render={({ field: { onChange, value } }) => {
        return <Checkbox {...checkBoxProps} checked={value} onChange={onChange} />;
      }}
    />
  );
};
