import { Stack, Typography } from "@mui/material"
import Box from "@mui/material/Box"
import CircularProgress from "@mui/material/CircularProgress"

export default function Loading() {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack alignItems={"center"} rowGap={2}>
        <CircularProgress />
        <Typography> Đang tải...</Typography>
      </Stack>
    </Box>
  )
}
