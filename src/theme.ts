import { createTheme } from '@mui/material/styles'

export const customTheme = createTheme({
  palette: {
    mode: 'dark'
  },
  typography: {
    fontFamily: 'Rubik',
    h4: {
      fontFamily: 'Plus Jakarta Sans',
      fontWeight: 600,
    },
    h6: {
      fontFamily: 'Plus Jakarta Sans',
      fontWeight: 600,
    },
    button: {
      fontFamily: 'Plus Jakarta Sans',
      fontWeight: 700,
    },
    caption: {
      fontFamily: 'Plus Jakarta Sans',
      fontWeight: 800,
    },
  },
})
