import { MenuItem, Select, SelectProps, TextField, TextFieldProps } from '@mui/material';
import { Controller, UseControllerProps } from 'react-hook-form';
import { SecondaryDropDown } from '.';
interface ControlledFormInputProps {
  controllerProps: UseControllerProps;
  textFieldProps: TextFieldProps;
}
export const ControlledFormInput = ({ controllerProps, textFieldProps }: ControlledFormInputProps) => {
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
          {...textFieldProps}
          variant="outlined"
        />
      )}
    />
  );
};
interface FormInputDropdownProps<T> extends UseControllerProps {
  selectProps?: SelectProps<T>;
  options: { label: string; value: string }[];
}

export const FormInputDropdown = <T,>({
  selectProps,
  options,
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
    />
  );
};

interface FormInputDropdownBootstrapProps extends UseControllerProps {
  options: { label: string; value: string }[];
  title: string;
}

export const FormInputDropdownBootstrap = ({
  options,
  title,
  ...controllerProps
}: FormInputDropdownBootstrapProps): React.ReactElement => {
  return (
    <Controller
      render={({ field: { onChange } }) => (
        <SecondaryDropDown options={options} title={title} handleChange={onChange} />
      )}
      {...controllerProps}
    />
  );
};
