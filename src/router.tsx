import { createBrowserRouter } from "react-router-dom"
import RootLayout from "./components/RootLayout"
import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import AuthGuard from "./components/AuthGuard"
import ValidateRedirect from "./components/ValidateRedirect"

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthGuard>
        <RootLayout />
      </AuthGuard>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    element: <ValidateRedirect />,
    children: [
      {
        path: "sign-in",
        element: <SignIn />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
    ],
  },
])

export default router
