import { createBrowserRouter } from "react-router-dom"
import AuthGuard from "./components/AuthGuard"
import RootLayout from "./components/RootLayout"
import ValidateRedirect from "./components/ValidateRedirect"
import { Home, SignIn, SignUp } from "./pages"
import NotFoundPage from "./pages/NotFound"

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
    path: "auth",
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
  {
    path: "*",
    element: <NotFoundPage />,
  },
])

export default router
