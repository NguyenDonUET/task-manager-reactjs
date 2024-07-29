import {
  Box,
  Button,
  Container,
  Pagination,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { getTasks } from '../api/tasks';
import Loading from '../components/Loading';
import BaseModal from '../components/base/BaseModal';
import TaskFormAdd from '../components/tasks/TaskFormAdd';
import TasksContainer from '../components/tasks/TasksContainer';
import { TaskType } from '../types';

export default function Home() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [page, setPage] = useState(1);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { data, isPending, isError, error, isSuccess } = useQuery({
    queryKey: ['tasks', page],
    queryFn: () => getTasks(page),
    retry: 2,
    refetchOnWindowFocus: true,
    refetchOnMount: false,
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (isSuccess) {
      setTasks(data.tasks);
    }

    return () => {};
  }, [isSuccess, data]);

  if (isPending) {
    return <Loading />;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    event.preventDefault();
    setPage(value);
  };

  return (
    <>
      <Container>
        <Box className='flex justify-between items-center md:items-end pb-4 text-gray-500'>
          <Typography
            variant='body2'
            sx={{ fontSize: { xs: '13px', sm: '14px', md: '16px' } }}
          >
            {data.numberInCompletedTasks > 0 &&
              `Tổng số: ${data.numberInCompletedTasks} việc chưa hoàn thành.`}
          </Typography>
          <Button
            sx={{ fontSize: isSmallScreen ? '14px' : '16px' }}
            variant={'contained'}
            onClick={handleOpen}
          >
            Thêm mới
          </Button>
        </Box>
        {<TasksContainer tasks={tasks} page={page} />}

        <BaseModal handleClose={handleClose} open={open} title='Thêm task mới'>
          <TaskFormAdd handleClose={handleClose} />
        </BaseModal>

        {data.totalPages > 0 && (
          <Box marginBlock={4} display={'flex'} justifyContent={'center'}>
            <Pagination
              color='primary'
              count={data.totalPages}
              page={page}
              onChange={handleChange}
            />
          </Box>
        )}
      </Container>
    </>
  );
}
