import { Outlet } from "react-router-dom"
import Header from "./Header"

export default function RootLayout() {
  return (
    <>
      <Header />
      <main className='max-w-6xl mx-auto pt-12'>
        <Outlet />
      </main>
    </>
  )
}
