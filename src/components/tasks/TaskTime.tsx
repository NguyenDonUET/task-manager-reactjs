import { Stack, Tooltip, Typography } from "@mui/material"
import formatDate from "../../utils/formatDateString"
import { ReactNode } from "react"
type TaskTimeProps = {
  date: string
  children?: ReactNode
  label?: string
}
export default function TaskTime({ children, date, label }: TaskTimeProps) {
  return (
    <Tooltip title={label} placement='right'>
      <Stack direction={"row"} alignItems={"end"} gap={"5px"}>
        {children}
        <Typography variant='body2'>{formatDate(date)}</Typography>
      </Stack>
    </Tooltip>
  )
}
