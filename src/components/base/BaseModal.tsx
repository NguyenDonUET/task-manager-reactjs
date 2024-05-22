import { Box, Modal, Typography } from "@mui/material"
import { ReactNode } from "react"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  minWidth: "600px",
}

type BaseModalProps = {
  title: string
  children: ReactNode
  open: boolean
  handleClose: () => void
}

export default function BaseModal({
  title,
  children,
  open,
  handleClose,
}: BaseModalProps) {
  return (
    <Modal
      keepMounted
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style} className='rounded-md'>
        <Typography variant='h3' gutterBottom>
          {title}
        </Typography>
        {children}
      </Box>
    </Modal>
  )
}
