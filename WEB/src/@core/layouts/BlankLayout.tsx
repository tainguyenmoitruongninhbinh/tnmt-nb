// ** MUI Imports
import { styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'

// ** Types
import { BlankLayoutProps } from './types'
import { useRequireAuth } from '../hooks/useRequireAuth'
import { useRouter } from 'next/router'

// Styled component for Blank Layout component
const BlankLayoutWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  height: '100vh',

  // For V1 Blank layout pages
  '& .content-center': {
    display: 'flex',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(5)
  },

  // For V2 Blank layout pages
  '& .content-right': {
    display: 'flex',
    minHeight: '100vh',
    overflowX: 'hidden',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'right',
    padding: theme.spacing(5)
  }
}))

const BlankLayout = ({ children }: BlankLayoutProps) => {
  const router = useRouter()
  const { isLoggedIn } = useRequireAuth()

  console.log(isLoggedIn, router.pathname)
  if (!isLoggedIn && router.pathname !== '/login') {
    router.push('/login')
  }

  return (
    <BlankLayoutWrapper className='layout-wrapper'>
      <Box className='app-content' sx={{ minHeight: '100vh', overflowX: 'hidden', position: 'relative' }}>
        {children}
      </Box>
    </BlankLayoutWrapper>
  )
}

export default BlankLayout
