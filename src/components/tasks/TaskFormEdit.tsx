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
import { useMutation, useQueryClient } from "@tanstack/react-query"
import React from "react"
import { Controller, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"
import { updateTask } from "../../api/tasks"
import { AddTaskFormData, Priority, Status, TaskType } from "../../types"
import BaseInputField from "../base/BaseInputField"

interface TaskFormAddProps {
  handleClose: () => void
  task: TaskType
  page: number
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

const TaskFormEdit: React.FC<TaskFormAddProps> = ({
  handleClose,
  task,
  page,
}: TaskFormAddProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AddTaskFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: task.name,
      description: task.description,
      priority: task.priority,
      status: Status.Pending,
      deadline: task.deadline.substring(0, 10),
    },
  })
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: (newTask: AddTaskFormData) => updateTask(task._id, newTask),
    onSuccess: () => {
      toast.success("Cập nhật thành công!")
      queryClient.refetchQueries({
        queryKey: ["tasks", page],
        exact: true,
      })
      handleClose()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSubmit = async (data: AddTaskFormData) => {
    mutate(data)
    // console.log(data)
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
          defaultValue={task.name}
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
              defaultValue={Priority.High}
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
            defaultValue={task.deadline}
          />
        </FormControl>

        <Stack direction={"row"} gap={2} marginLeft={"auto"}>
          <Button variant='outlined' onClick={handleClose}>
            Hủy
          </Button>
          <Button disabled={isPending} type='submit' variant='contained'>
            {isPending ? "Đang lưu" : "Lưu"}
          </Button>
        </Stack>
      </Box>
    </form>
  )
}

export default TaskFormEdit
