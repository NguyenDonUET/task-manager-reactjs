import { Container } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { getTasks } from "../api/tasks"
import Loading from "../components/Loading"
import TasksContainer from "../components/tasks/TasksContainer"
import { TaskType } from "../types"

export default function Home() {
  const [tasks, setTasks] = useState<TaskType[]>([])

  const { data, isPending, isError, error, isSuccess } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
    retry: 2,
  })

  useEffect(() => {
    if (isSuccess) {
      setTasks(data.tasks)
    }

    return () => {}
  }, [isSuccess, data])

  if (isPending) {
    return <Loading />
  }
  if (isError) {
    return <h2>{error.message}</h2>
  }

  return (
    <Container>
      <TasksContainer tasks={tasks} />
    </Container>
  )
}
