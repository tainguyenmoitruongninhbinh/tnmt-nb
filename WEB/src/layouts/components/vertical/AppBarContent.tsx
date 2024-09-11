// ** MUI Imports
import { ListItemButton, ListItemButtonProps, styled, Typography, useTheme } from '@mui/material'
import Box from '@mui/material/Box'

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'

// ** Components
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import React, { ElementType } from 'react'

interface Props {
  hidden: boolean
  settings: Settings
  toggleNavVisibility: () => void
  saveSettings: (values: Settings) => void
}

export const MenuNavLink = styled(ListItemButton)<
  ListItemButtonProps & { component?: ElementType; target?: '_blank' | undefined }
>(({ theme }) => ({
  width: 'max-content',
  padding: '22px 10px',
  textTransform: 'uppercase',
  position: 'relative',
  fontWeight: 'bold',
  wordSpacing: 2.5,
  fontSize: 14,
  '&.active': {
    color: '#F4F5FA',
    backgroundColor: `${theme.palette.primary.dark}`
  },
  '&:hover': {
    color: '#F4F5FA',
    backgroundColor: `${theme.palette.primary.dark}`,
    transition: 'all 0.3s ease-in-out' // Smooth transition for the hover effects
  },

  // Responsive adjustments
  [theme.breakpoints.down('xl')]: {
    fontSize: 10 // Reduce font size for small screens
  }
}))

const AppBarContent = (props: Props) => {
  // ** Props
  props

  const theme = useTheme()

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        <Typography
          color={`${theme.palette.primary.dark}`}
          variant='h6'
          textTransform={'uppercase'}
          fontSize={15}
          style={{ color: 'red', fontWeight: 700 }}>
          CƠ SỞ DỮ LIỆU PHÒNG CHỐNG THIÊN TAI TỈNH NINH BÌNH
        </Typography>
        <Box sx={{ display: 'none' }}></Box>
      </Box>
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
        <UserDropdown />
      </Box>
    </Box>
  )
}

export default AppBarContent
