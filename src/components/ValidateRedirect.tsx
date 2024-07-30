import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export default function ValidateRedirect() {
  const user = localStorage.getItem('userInfo')
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/home')
    }
  }, [user, navigate])
  return <Outlet />
}
