// ** React Imports
import { ReactNode } from 'react'

// ** MUI Components
import Button, { ButtonProps } from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Styled Components
const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '90vw'
  }
}))

const Link = styled(Button)<ButtonProps>({
  width: '100%',
  padding: 0,
  textTransform: 'none'
})

const Error401 = () => {
  return (
    <Box className='content-center' sx={{ my: 'auto' }}>
      <Box sx={{ p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <BoxWrapper>
          <Typography variant='h1'>401</Typography>
          <Typography variant='h5' sx={{ mb: 1, fontSize: '1.5rem !important' }}>
            Bạn không được ủy quyền!! 🔐
          </Typography>
          <Typography variant='body2'>Bạn không có quyền truy cập trang này. Về trang chủ!</Typography>
        </BoxWrapper>
        <Link href='/'>
          <Button component='a' variant='contained' sx={{ px: 5.5, my: 3 }}>
            Về trang chủ
          </Button>
        </Link>
      </Box>
    </Box>
  )
}

Error401.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default Error401
