import { zodResolver } from "@hookform/resolvers/zod"
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  MenuItem,
  Stack,
  TextField,
  TextareaAutosize,
} from "@mui/material"
import React from "react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { AddTaskFormData, Priority, Status, TaskType } from "../../types"
import BaseInputField from "../base/BaseInputField"
import { useMutation } from "@tanstack/react-query"
import { addTask } from "../../api/tasks"
import toast from "react-hot-toast"

interface TaskFormAddProps {
  handleClose: () => void
}

// Định nghĩa schema cho dữ liệu AddTaskFormData
const schema = z.object({
  deadline: z
    .string()
    .min(1, "Hạn chót không được để trống")
    .refine((value) => {
      const today = new Date()
      const selectedDate = new Date(value)
      return selectedDate.getTime() >= today.setHours(0, 0, 0, 0)
    }, "Deadline phải từ hôm nay trở đi"),
  description: z.string().min(1, "Mô tả không được để trống"),
  name: z.string().min(1, "Tên không được để trống"),
  priority: z.nativeEnum(Priority),
  status: z.nativeEnum(Status),
})

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
  const { mutate, isPending } = useMutation({
    mutationFn: (task: AddTaskFormData) => addTask(task),
    onSuccess: () => {
      toast.success("Thêm mới thành công!")
      handleClose()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSubmit = async (data: AddTaskFormData) => {
    mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box className='flex flex-col gap-5'>
        <BaseInputField
          placeholder='Nhập tên'
          label='Tên'
          name='name'
          control={control}
          errorText={errors.name?.message}
        />
        {/* description */}
        <Controller
          name='description'
          control={control}
          render={({ field }) => (
            <Box>
              <FormLabel htmlFor='description'>Mô tả</FormLabel>
              <TextareaAutosize
                {...field}
                name='description'
                className={`${
                  errors.description?.message && "error"
                } p-3 border`}
                placeholder='Nhập mô tả...'
                minRows={4}
                maxRows={7}
                style={{ width: "100%" }}
              />
              <FormHelperText error>
                {errors.description?.message}
              </FormHelperText>
            </Box>
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
          <Button disabled={isPending} type='submit' variant='contained'>
            {isPending ? "Đang thêm" : "Thêm"}
          </Button>
        </Stack>
      </Box>
    </form>
  )
}

export default TaskFormAdd
