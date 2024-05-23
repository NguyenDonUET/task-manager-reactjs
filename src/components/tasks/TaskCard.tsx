import {
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material"
import { Pencil, Trash2 } from "lucide-react"
import React from "react"
import { TaskType } from "../../types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteTask } from "../../api/tasks"
import toast from "react-hot-toast"
interface TaskCardProps {
  task: TaskType
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
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
    mutate(task._id)
  }
  return (
    <Card
      variant='outlined'
      sx={{ minHeight: "300px", display: "flex", flexDirection: "column" }}
      className='shadow-lg'
    >
      <CardContent>
        <Typography variant='h6' color={"#673ab7"}>
          {task.name}
        </Typography>
        <Typography variant='body1'>Description: {task.description}</Typography>
        <Typography variant='body2'>Priority: {task.priority}</Typography>
        <Typography variant='body2'>Status: {task.status}</Typography>
        <Typography variant='body2'>Created at: {task.createdAt}</Typography>
        <Typography variant='body2'>Updated at: {task.updatedAt}</Typography>
        <Typography variant='body2'>Deadline: {task.deadline}</Typography>
      </CardContent>
      <CardActions disableSpacing className='justify-between mt-auto'>
        <Button
          variant='contained'
          sx={{
            borderRadius: "16px",
            marginLeft: "2px",
            textTransform: "capitalize",
            backgroundColor: "#4caf50",
            "&:hover": {
              backgroundColor: "#357a38",
            },
          }}
        >
          Mark as done
        </Button>
        <Stack direction={"row"}>
          <IconButton aria-label='delete' size='large'>
            <Pencil color='#38a56a' />
          </IconButton>
          <IconButton
            aria-label='delete'
            size='large'
            disabled={isPending}
            onClick={handleDelete}
          >
            <Trash2 color='#d32f2f' />
          </IconButton>
        </Stack>
      </CardActions>
    </Card>
  )
}

export default TaskCard
