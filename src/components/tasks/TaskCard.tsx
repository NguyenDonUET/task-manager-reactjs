// TaskCard.tsx

import React from "react"
import { Card, CardContent, Typography } from "@mui/material"
import { TaskType } from "../../types"

interface TaskCardProps {
  task: TaskType
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant='h6'>{task.name}</Typography>
        <Typography variant='body1'>Description: {task.description}</Typography>
        <Typography variant='body2'>Priority: {task.priority}</Typography>
        <Typography variant='body2'>Status: {task.status}</Typography>
        <Typography variant='body2'>Created at: {task.createdAt}</Typography>
        <Typography variant='body2'>Updated at: {task.updatedAt}</Typography>
        <Typography variant='body2'>Deadline: {task.deadline}</Typography>
        <Typography variant='body2'>User ID: {task.userId}</Typography>
      </CardContent>
    </Card>
  )
}

export default TaskCard
