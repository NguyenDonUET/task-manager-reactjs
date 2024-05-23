import { FormControl, FormLabel, InputLabel, TextField } from "@mui/material"
import { Control, Controller, FieldValues } from "react-hook-form"

interface BaseInputFieldProps {
  name: string
  label: string
  control: Control<any>
  errorText: string | undefined
  placeholder: string
  defaultValue?: string
}

const BaseInputField: React.FC<BaseInputFieldProps> = ({
  name,
  label,
  control,
  errorText,
  placeholder,
  defaultValue,
}) => {
  return (
    <FormControl>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <FormLabel htmlFor={name}>{label}</FormLabel>
            <TextField
              defaultValue={defaultValue}
              {...field}
              margin='dense'
              id={name}
              fullWidth
              error={!!errorText}
              helperText={errorText}
              placeholder={placeholder}
            />
          </>
        )}
      />
    </FormControl>
  )
}

export default BaseInputField
