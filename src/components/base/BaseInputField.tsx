import { FormControl, FormLabel, InputLabel, TextField } from "@mui/material"
import { Control, Controller, FieldValues } from "react-hook-form"

interface BaseInputFieldProps {
  name: string
  label: string
  control: Control<any>
  errorText: string
  placeholder: string
}

const BaseInputField: React.FC<BaseInputFieldProps> = ({
  name,
  label,
  control,
  errorText,
  placeholder,
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
              margin='dense'
              required
              id={name}
              {...field}
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
