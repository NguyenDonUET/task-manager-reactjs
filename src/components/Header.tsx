import { Stack } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useMutation } from '@tanstack/react-query'
import * as React from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from '../api/customAxios'
import { useAppDispatch } from '../redux/hooks'
import { userLogout, UserType } from '../redux/user/userSlice'
import { SIGN_IN_PATH } from '../utils/constants'

const menuOptoins = ['Đăng xuất']

function Header() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  )
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  // const { user } = useAppSelector((state) => state.user)
  const user = JSON.parse(localStorage.getItem('userInfo')!) as UserType

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = (option: string) => {
    if (option === 'Đăng xuất') {
      handleLogout()
    }
    setAnchorElUser(null)
  }

  const logout = async () => {
    const { data } = await axiosInstance.get('/auth/logout')
    return data
  }

  const { mutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      localStorage.removeItem('userInfo')
      dispatch(userLogout())
      toast.success('Đăng xuất')
      navigate(SIGN_IN_PATH)
    },
  })

  const handleLogout = async () => {
    mutate()
  }

  return (
    <AppBar position='static' color='transparent' enableColorOnDark>
      <Container maxWidth='md'>
        <Toolbar disableGutters>
          <Typography
            variant='h5'
            noWrap
            sx={{
              mr: 2,
              display: 'flex',
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: {
                md: '.3rem',
              },
              color: 'inherit',
              textDecoration: 'none',
              fontSize: { xs: '1.6rem', sm: '1.7rem', md: '1.8rem' },
            }}
          >
            TASK MANGER
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Stack direction={'row'} gap={1} alignItems={'center'}>
              <Typography
                onClick={handleOpenUserMenu}
                className='cursor-pointer'
              >
                {user?.username}
              </Typography>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  sx={{ bgcolor: 'blueviolet' }}
                  alt='D'
                  src='/static/images/avatar/2.jpg'
                />
              </IconButton>
            </Stack>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {menuOptoins.map((option) => (
                <MenuItem
                  key={option}
                  onClick={() => handleCloseUserMenu(option)}
                >
                  <Typography textAlign='center'>{option}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Header
