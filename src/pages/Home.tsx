import { Button, Stack } from "@mui/material"
import { Camera } from "lucide-react"
import { Link } from "react-router-dom"

export default function Home() {
  return (
    <div>
      <Button variant='contained'>Hello world</Button>
      <Camera color='red' size={48} />
      <Stack gap={4}>
        <Link to={"/sign-in"}>Login</Link>
        <Link to={"/sign-up"}>SignUp</Link>
      </Stack>
    </div>
  )
}
