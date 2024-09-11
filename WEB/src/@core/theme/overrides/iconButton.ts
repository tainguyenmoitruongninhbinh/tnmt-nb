// ** MUI Imports
import { Theme } from '@mui/material/styles'

// ** Theme Config Imports
import themeConfig from 'src/configs/themeConfig'

const IconButton = (theme: Theme) => {
  return {
    MuiIconButton: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          borderRadius: 3,
          lineHeight: 1.71,
          letterSpacing: '0.3px',
          whiteSpace: 'nowrap',
          fontSize: '11px',
          padding: `${theme.spacing(1.875, 3)}`
        },
        contained: {
          boxShadow: theme.shadows[3],
          padding: `${theme.spacing(1.875, 5.5)}`
        },
        outlined: {
          padding: `${theme.spacing(1.625, 5.25)}`
        },
        sizeSmall: {
          padding: `${theme.spacing(1, 2.25)}`,
          '&.MuiIconButton-contained': {
            padding: `${theme.spacing(1, 3.5)}`
          },
          '&.MuiIconButton-outlined': {
            padding: `${theme.spacing(1.4, 5.25)}`
          }
        },
        sizeLarge: {
          padding: `${theme.spacing(2.125, 5.5)}`,
          '&.MuiIconButton-contained': {
            padding: `${theme.spacing(2.125, 6.5)}`
          },
          '&.MuiIconButton-outlined': {
            padding: `${theme.spacing(1.875, 6.25)}`
          }
        }
      }
    },
    MuiIconButtonBase: {
      defaultProps: {
        disableRipple: themeConfig.disableRipple
      }
    }
  }
}

export default IconButton
