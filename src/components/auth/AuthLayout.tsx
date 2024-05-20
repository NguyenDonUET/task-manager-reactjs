import { Box, Typography } from "@mui/material"
import { ReactNode } from "react"

type AuthLayoutProps = {
  children: ReactNode
  title: string
}

export default function AuthLayout({ children, title }: AuthLayoutProps) {
  return (
    <div className='max-w-6xl mx-auto min-h-screen grid place-items-center'>
      <Box paddingX={4}>
        <Typography
          variant='h4'
          component='h2'
          textAlign={"center"}
          gutterBottom
        >
          {title}
        </Typography>
        {children}
      </Box>
    </div>
  )
}
