import { Box, Button, Container, Pagination } from "@mui/material"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { getTasks } from "../api/tasks"
import Loading from "../components/Loading"
import BaseModal from "../components/base/BaseModal"
import TasksContainer from "../components/tasks/TasksContainer"
import { TaskType } from "../types"
import TaskFormAdd from "../components/tasks/TaskFormAdd"

export default function Home() {
  const [tasks, setTasks] = useState<TaskType[]>([])
  const [page, setPage] = useState(1)

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

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
    <>
      <Container>
        <Box className='flex justify-end pb-4'>
          <Button variant='contained' onClick={handleOpen}>
            Thêm mới
          </Button>
        </Box>
        <TasksContainer tasks={tasks} />

        <BaseModal handleClose={handleClose} open={open} title='Thêm task mới'>
          <TaskFormAdd handleClose={handleClose} />
        </BaseModal>

        <Box marginBlock={4} display={"flex"} justifyContent={"center"}>
          <Pagination
            color='primary'
            count={data.totalPages}
            page={page}
            onChange={handleChange}
          />
        </Box>
      </Container>
    </>
  )
}
