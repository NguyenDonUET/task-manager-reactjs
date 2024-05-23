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
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
  AlarmClockCheck,
  Check,
  Clock,
  Hourglass,
  Pencil,
  Trash2,
} from "lucide-react"
import React, { useState } from "react"
import toast from "react-hot-toast"
import { deleteTask, updateTask } from "../../api/tasks"
import { Status, TaskType } from "../../types"
import BaseModal from "../base/BaseModal"
import TaskChip from "./TaskChip"
import TaskFormEdit from "./TaskFormEdit"
import TaskTime from "./TaskTime"

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
        sx={{
          minHeight: "320px",
          display: "flex",
          flexDirection: "column",
        }}
        className='shadow-lg'
      >
        <Stack direction={"row"} alignItems={""} paddingX={2}>
          <TaskTime date={task.createdAt} label='Ngày tạo'></TaskTime>
          <TaskChip text={task.priority} />
        </Stack>

        <CardContent
          sx={{
            paddingBottom: "0",
            flex: "1",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant='h6' color={"#673ab7"} noWrap>
            {task.name}
          </Typography>

          <Typography variant='body1' color={"GrayText"} flex={"1"} marginY={2}>
            {task.description}
          </Typography>

          <Stack>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <TaskTime date={task.deadline} label='Hạn chót'>
                <Hourglass color='#767676' className='inline-block' />
              </TaskTime>

              <TaskTime date={task.updatedAt} label='Cập nhật'>
                <Clock color='#767676' className='inline-block' />
              </TaskTime>
            </Stack>
          </Stack>
        </CardContent>

        <CardActions disableSpacing className='justify-between '>
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
