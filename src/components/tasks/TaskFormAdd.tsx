import { zodResolver } from "@hookform/resolvers/zod"
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  MenuItem,
  Stack,
  TextField,
  TextareaAutosize,
} from "@mui/material"
import React from "react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { AddTaskFormData, Priority, Status } from "../../types"
import BaseInputField from "../base/BaseInputField"

interface TaskFormAddProps {
  handleClose: () => void
}

// Định nghĩa schema cho dữ liệu AddTaskFormData
const schema = z.object({
  deadline: z.string().min(1, "Deadline can't empty"),
  description: z.string(),
  name: z.string(),
  priority: z.nativeEnum(Priority),
  status: z.nativeEnum(Status),
})

// create datetime-local string in js
// new Date().toISOString().slice(0, 16)

const TaskFormAdd: React.FC<TaskFormAddProps> = ({
  handleClose,
}: TaskFormAddProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AddTaskFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      priority: Priority.Medium,
      status: Status.Pending,
      deadline: "",
    },
  })

  const onSubmit = async (data: AddTaskFormData) => {
    console.log("data", data)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box className='flex flex-col gap-4'>
        <BaseInputField
          placeholder='Nhập tên'
          label='Tên'
          name='name'
          control={control}
          errorText=''
        />
        {/* description */}
        <Controller
          name='description'
          control={control}
          render={({ field }) => (
            <>
              <FormLabel htmlFor='description'>Mô tả</FormLabel>
              <TextareaAutosize
                {...field}
                name='description'
                className='border p-3'
                placeholder='Nhập mô tả...'
                minRows={4} // Set the minimum number of rows
                maxRows={7} // Set the maximum number of rows
                style={{ width: "100%" }} // Adjust the width as needed
              />
            </>
          )}
        />
        {/* Độ ưu tiên */}
        <Controller
          name='priority'
          control={control}
          render={({ field }) => (
            <TextField
              select
              label='Độ ưu tiên'
              defaultValue={Priority.Medium}
              {...field}
            >
              <MenuItem value={Priority.Low}>Thấp</MenuItem>
              <MenuItem value={Priority.Medium}>Trung bình</MenuItem>
              <MenuItem value={Priority.High}>Cao</MenuItem>
            </TextField>
          )}
        />
        {/* deadline */}
        <FormControl>
          <FormLabel htmlFor='deadline'>Hạn chót</FormLabel>
          <TextField
            id='deadline'
            fullWidth
            margin='dense'
            type='date'
            {...register("deadline")}
            error={!!errors.deadline}
            helperText={errors.deadline?.message}
          />
        </FormControl>

        <Stack direction={"row"} gap={2} marginLeft={"auto"}>
          <Button variant='outlined' onClick={handleClose}>
            Hủy
          </Button>
          <Button type='submit' variant='contained'>
            Thêm
          </Button>
        </Stack>
      </Box>
    </form>
  )
}

export default TaskFormAdd
