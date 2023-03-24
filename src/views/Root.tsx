import CollectionIcon from '@mui/icons-material/AutoStoriesRounded'
import DarkModeIcon from '@mui/icons-material/DarkModeRounded'
import LightModeIcon from '@mui/icons-material/LightModeRounded'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { ThemeProvider } from '@mui/material/styles'
import { FC, useCallback, useContext } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { useAppSelector } from 'src/hooks/useAppSelector'
import { usePaletteMode } from 'src/hooks/usePaletteMode'
import { TranslateContext } from '../hooks/useTranslate'

const Root: FC = () => {
  const location = useLocation()
  const { theme, togglePaletteMode } = usePaletteMode()
  const settings = useAppSelector(state => state.settings)
  const { t } = useContext(TranslateContext)

  const getTitleAndDescription = useCallback((): {
    title: 'composition' | 'collection'
    description: 'composition_description' | 'collection_description'
  } => {
    switch (location.pathname.split('/')[1]) {
      default:
      case '':
        return {
          title: 'composition',
          description: 'composition_description',
        }
      case 'collection':
        return {
          title: 'collection',
          description: 'collection_description',
        }
    }
  }, [location.pathname])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box component="main">
        <AppBar position="static">
          <Container maxWidth="md">
            <Toolbar
              disableGutters
              sx={{ justifyContent: 'space-between', position: 'relative' }}
            >
              <Link
                to="/"
                style={{ textDecoration: 'none', color: 'inherit' }}
                aria-label={t('composition')}
              >
                <Box display="flex" alignItems="center">
                  <Box mr={2}>
                    <i className="ss ss-j21 ss-3x" />
                  </Box>
                  <Typography variant="h6" component="h1">
                    Jumpstart In!
                  </Typography>
                </Box>
              </Link>
              <Box display="flex">
                <Box mr={1}>
                  <IconButton
                    aria-label={t('toggle_palette_mode')}
                    color="inherit"
                    onClick={togglePaletteMode}
                    title={t('toggle_palette_mode')}
                  >
                    {settings.paletteMode === 'light' ? (
                      <DarkModeIcon />
                    ) : (
                      <LightModeIcon />
                    )}
                  </IconButton>
                </Box>
                <IconButton
                  aria-label={t('collection')}
                  color="inherit"
                  component={Link}
                  to="/collection"
                  title={t('collection')}
                >
                  <CollectionIcon />
                </IconButton>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <Container maxWidth="md">
          <Box mt={2} mb={12}>
            <Box my={6}>
              <Typography variant="h4">
                {t(getTitleAndDescription().title)}
              </Typography>
              <Typography>{t(getTitleAndDescription().description)}</Typography>
            </Box>
            <Outlet />
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default Root
