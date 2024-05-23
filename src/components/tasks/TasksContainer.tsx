import React from "react"
import { Grid, Typography } from "@mui/material"
import TaskCard from "./TaskCard" // Đảm bảo rằng bạn đã import đúng đường dẫn
import { TaskType } from "../../types"

interface TasksContainerProps {
  tasks: TaskType[]
}

const TasksContainer: React.FC<TasksContainerProps> = ({ tasks }) => {
  if (tasks.length <= 0) {
    return (
      <Typography
        component={"h4"}
        marginTop={6}
        sx={{
          fontSize: "2rem",
          textAlign: "center",
          color: "#9ea9b1",
        }}
      >
        Chưa có nhiệm vụ nào được thêm!
      </Typography>
    )
  }
  return (
    <Grid container spacing={2} minHeight={"540px"}>
      {tasks.map((task) => (
        <Grid item key={task._id} xs={12} sm={6} md={4}>
          <TaskCard task={task} />
        </Grid>
      ))}
    </Grid>
  )
}

export default TasksContainer
