import { Outlet } from "react-router-dom"
import Header from "./Header"
import { Toaster } from "react-hot-toast"

export default function RootLayout() {
  return (
    <>
      <Header />
      <main className='max-w-6xl mx-auto pt-24'>
        <Outlet />
      </main>
      <Toaster />
    </>
  )
}
