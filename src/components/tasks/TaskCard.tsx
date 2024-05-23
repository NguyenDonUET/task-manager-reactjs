import {
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material"
import { Check, Pencil, Trash2 } from "lucide-react"
import React, { useState } from "react"
import { AddTaskFormData, Status, TaskType } from "../../types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteTask, updateTask } from "../../api/tasks"
import toast from "react-hot-toast"
import BaseModal from "../base/BaseModal"
import TaskFormEdit from "./TaskFormEdit"

interface TaskCardProps {
  task: TaskType
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const queryClient = useQueryClient()
  const { mutate: deleteMutate, isPending: deletePending } = useMutation({
    mutationFn: (taskId: string) => deleteTask(taskId),
    onSuccess: () => {
      toast.success("Xóa thành công!")
      queryClient.refetchQueries({
        queryKey: ["tasks", 1],
        exact: true,
      })
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const handleDelete = () => {
    deleteMutate(task._id)
  }

  const isTaskCompleted = task.status === Status.Completed

  const { mutate: toggleMutate } = useMutation({
    mutationFn: (task: TaskType) => updateTask(task._id, task),
    onSuccess: () => {
      if (isTaskCompleted) {
        toast.success("Cập nhật thành công!")
      } else {
        toast.success("Chúc mừng bạn đã hoàn thành!")
      }
      queryClient.refetchQueries({
        queryKey: ["tasks", 1],
        exact: true,
      })
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const handleToggleTask = () => {
    toggleMutate({
      ...task,
      status: isTaskCompleted ? Status.Pending : Status.Completed,
    })
  }

  return (
    <>
      <Card
        variant='outlined'
        sx={{ minHeight: "300px", display: "flex", flexDirection: "column" }}
        className='shadow-lg'
      >
        <CardContent>
          <Typography variant='h6' color={"#673ab7"}>
            {task.name}
          </Typography>
          <Typography variant='body1'>
            Description: {task.description}
          </Typography>
          <Typography variant='body2'>Priority: {task.priority}</Typography>
          <Typography variant='body2'>Status: {task.status}</Typography>
          <Typography variant='body2'>Created at: {task.createdAt}</Typography>
          <Typography variant='body2'>Updated at: {task.updatedAt}</Typography>
          <Typography variant='body2'>Deadline: {task.deadline}</Typography>
        </CardContent>
        <CardActions disableSpacing className='justify-between mt-auto'>
          <Tooltip
            title={
              isTaskCompleted
                ? "Đánh dấu là chưa hoàn thành"
                : "Đánh dấu là hoàn thành"
            }
            placement='top'
          >
            <Button
              onClick={handleToggleTask}
              startIcon={isTaskCompleted && <Check color='#fff' />}
              variant='contained'
              sx={{
                borderRadius: "16px",
                marginLeft: "2px",
                textTransform: "capitalize",
                backgroundColor: `${isTaskCompleted ? "#4caf50" : "gray"}`,
                "&:hover": {
                  opacity: 0.8,
                  background: "#357a38",
                },
              }}
            >
              {isTaskCompleted ? "Đã hoàn thành" : "Hoàn thành"}
            </Button>
          </Tooltip>

          <Stack direction={"row"}>
            <Tooltip title={"Sửa"} placement='top'>
              <IconButton aria-label='delete' size='large' onClick={handleOpen}>
                <Pencil color='#38a56a' />
              </IconButton>
            </Tooltip>
            <Tooltip title={"Xóa"} placement='top'>
              <IconButton
                aria-label='delete'
                size='large'
                disabled={deletePending}
                onClick={handleDelete}
              >
                <Trash2 color='#d32f2f' />
              </IconButton>
            </Tooltip>
          </Stack>
        </CardActions>
      </Card>

      <BaseModal handleClose={handleClose} open={open} title='Cập nhật task'>
        <TaskFormEdit handleClose={handleClose} task={task} />
      </BaseModal>
    </>
  )
}

export default TaskCard
