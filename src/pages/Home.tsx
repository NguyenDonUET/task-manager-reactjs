import { Box, Container, Pagination } from "@mui/material"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { getTasks } from "../api/tasks"
import Loading from "../components/Loading"
import TasksContainer from "../components/tasks/TasksContainer"
import { TaskType } from "../types"

export default function Home() {
  const [tasks, setTasks] = useState<TaskType[]>([])
  const [page, setPage] = useState(1)

  const { data, isPending, isError, error, isSuccess } = useQuery({
    queryKey: ["tasks", page],
    queryFn: () => getTasks(page),
    retry: 2,
    placeholderData: keepPreviousData,
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

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  return (
    <Container>
      <TasksContainer tasks={tasks} />
      <Box marginBlock={4} display={"flex"} justifyContent={"center"}>
        <Pagination
          color='primary'
          count={data.totalPages}
          page={page}
          onChange={handleChange}
        />
      </Box>
    </Container>
  )
}
