import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, Stack } from '@mui/material'

interface DialogControlProps {
  children: (
    openDialogs: (content: React.ReactNode, title: React.ReactNode) => void,
    closeDialogs: () => void
  ) => React.ReactNode
}

const DialogsControl = ({ children }: DialogControlProps) => {
  const [dialogContent, setDialogContent] = useState<React.ReactNode>(null)
  const [dialogTitle, setDialogTitle] = useState<React.ReactNode>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const openDialogs = (content: React.ReactNode, title: React.ReactNode) => {
    setDialogContent(content)
    setDialogTitle(title)
    setIsOpen(true)
  }

  const closeDialogs = () => {
    setDialogContent(null)
    setDialogTitle(null)
    setIsOpen(false)
  }

  return (
    <Stack>
      {children(openDialogs, closeDialogs)}
      <Dialog open={isOpen} onClose={closeDialogs}>
        {dialogContent && (
          <Stack>
            <DialogTitle sx={{ textAlign: 'center', textTransform: 'uppercase' }}>{dialogTitle}</DialogTitle>
            <DialogContent>{dialogContent}</DialogContent>
          </Stack>
        )}
      </Dialog>
    </Stack>
  )
}

export default DialogsControl
