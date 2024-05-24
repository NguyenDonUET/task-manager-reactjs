import { Box, Button, Stack, Typography } from "@mui/material"
import { Link } from "react-router-dom"

export default function NotFoundPage() {
  return (
    <Stack minHeight={"100vh"} justifyContent={"center"} alignItems={"center"}>
      <Box textAlign={"center"}>
        <Typography
          component={"h1"}
          variant='h1'
          color={"GrayText"}
          fontWeight={"700"}
        >
          404
        </Typography>

        <Typography
          component={"h4"}
          variant='h4'
          color={"slategray"}
          fontWeight={"400"}
          marginY={2}
        >
          Sorry, we couldn't find this page.
        </Typography>
        <Button variant='contained'>
          <Link to={"/"}>Back to home page</Link>
        </Button>
      </Box>
    </Stack>
  )
}
