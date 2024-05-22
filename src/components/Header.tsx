import { Stack } from "@mui/material"
import AppBar from "@mui/material/AppBar"
import Avatar from "@mui/material/Avatar"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import IconButton from "@mui/material/IconButton"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import * as React from "react"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { axiosInstance } from "../api/customAxios"
import { useMutation } from "@tanstack/react-query"
import { LOCAL_ACCESS_TOKEN_KEY, SIGN_IN_PATH } from "../utils/constants"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { userLogout } from "../redux/user/userSlice"

const menuOptoins = ["Dashboard", "Logout"]

function Header() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  )
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { user } = useAppSelector((state) => state.user)

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = (option: string) => {
    if (option === "Logout") {
      handleLogout()
    }
    setAnchorElUser(null)
  }

  const logout = async () => {
    const { data } = await axiosInstance.get("/auth/logout")
    return data
  }

  const { mutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      localStorage.removeItem(LOCAL_ACCESS_TOKEN_KEY)
      dispatch(userLogout())
      toast.success("Đăng xuất")
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
              display: "flex",
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            TASK MANGER
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Stack direction={"row"} gap={1} alignItems={"center"}>
              <Typography
                onClick={handleOpenUserMenu}
                className='cursor-pointer'
              >
                {user?.username}
              </Typography>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  sx={{ bgcolor: "blueviolet" }}
                  alt='D'
                  src='/static/images/avatar/2.jpg'
                />
              </IconButton>
            </Stack>
            <Menu
              sx={{ mt: "45px" }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
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
