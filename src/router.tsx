import { createBrowserRouter, Navigate } from 'react-router-dom'
import ValidateRedirect from './components/ValidateRedirect'
import { Home, SignIn, SignUp } from './pages'
import NotFoundPage from './pages/NotFound'
import RootLayout from './components/RootLayout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={'/auth/sign-in'} />,
  },
  {
    path: 'auth',
    element: <ValidateRedirect />,
    children: [
      {
        path: 'sign-in',
        element: <SignIn />,
      },
      {
        path: 'sign-up',
        element: <SignUp />,
      },
    ],
  },
  {
    path: 'home',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])

export default router
