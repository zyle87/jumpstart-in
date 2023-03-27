import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AddIcon from '@mui/icons-material/ForwardRounded'
import Accordion from '@mui/material/Accordion'
import AccordionActions from '@mui/material/AccordionActions'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { darken, lighten, useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { FC, useContext } from 'react'
import { useAppSelector } from 'src/hooks/useAppSelector'
import { useComposition } from 'src/hooks/useComposition'
import { useMTGTools } from 'src/hooks/useMTGTools'
import { TranslateContext } from 'src/hooks/useTranslate'
import BoosterCard from './BoosterCard'
import ColorIcon from './ColorIcon'

type Props = {
  deck: MTG.Deck
  index: number
}

const DeckAccordion: FC<Props> = ({ deck, index }) => {
  const composition = useAppSelector(state => state.composition)
  const { onHold, addBoosterToCurrentDeck, deleteDeck } = useComposition()
  const settings = useAppSelector(state => state.settings)
  const { getHexFromColor, getSetFromBooster, getCombinationFromDeck } =
    useMTGTools()
  const theme = useTheme()
  const mqUpMd = useMediaQuery(theme.breakpoints.up('md'))
  const { t } = useContext(TranslateContext)

  return (
    <Accordion defaultExpanded={deck.length !== 2}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{ overflow: 'hidden' }}
      >
        <Box display="flex" alignItems="center">
          <i className="ss ss-bcore ss-2x" title={t('deck')} />
          <Box ml={1} mr={2}>
            <Typography>#{index + 1}</Typography>
          </Box>
          {Array.from({ length: 2 }).map((_, boosterIndex) => (
            <Box key={boosterIndex} mr={1}>
              <Chip
                label={
                  <Box display="flex" alignItems="center">
                    {deck[boosterIndex] && (
                      <Box mr={1}>
                        <i
                          className={`ss ss-${getSetFromBooster(
                            deck[boosterIndex]
                          )?.toLowerCase()} ss-2x`}
                        />
                      </Box>
                    )}
                    {deck[boosterIndex] && (
                      <ColorIcon type={deck[boosterIndex].color} size={24} />
                    )}
                    <Box mx={2}>
                      {deck[boosterIndex]
                        ? `${deck[boosterIndex].TKey} #${deck[boosterIndex].variant}`
                        : '???'}
                    </Box>
                  </Box>
                }
                sx={theme => ({
                  cursor: 'pointer',
                  '> span': {
                    overflow: 'visible',
                  },
                  background:
                    deck[boosterIndex] &&
                    getHexFromColor(deck[boosterIndex].color),
                  color:
                    deck[boosterIndex] &&
                    theme.palette.getContrastText(
                      getHexFromColor(deck[boosterIndex].color)
                    ),
                })}
              />
            </Box>
          ))}
          <Box>
            <Chip
              label={
                <Box display="flex" alignItems="center">
                  {deck.length === 2 && <i className="ss ss-dpa ss-2x" />}
                  <Box mx={2}>{getCombinationFromDeck(deck)}</Box>
                </Box>
              }
              sx={theme => ({
                transition: 'none',
                color: theme.palette.text.primary,
                cursor: 'pointer',
                '> span': {
                  overflow: 'visible',
                },
              })}
            />
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={1}>
          {mqUpMd && <Grid item xs={2} />}
          {Array.from({ length: 2 }).map((_, boosterIndex) => (
            <Grid key={boosterIndex} item xs={6} md={4} mb={1}>
              <Box
                sx={theme => ({
                  background:
                    settings.paletteMode === 'light'
                      ? darken(theme.palette.background.default, 0.1)
                      : lighten(theme.palette.background.default, 0.1),
                  borderRadius: 2,
                })}
              >
                {deck[boosterIndex] ? (
                  <BoosterCard booster={deck[boosterIndex]} />
                ) : (
                  composition.pool[0] && (
                    <img
                      src={composition.pool[0].front}
                      alt="placeholder"
                      style={{
                        display: 'block',
                        width: '100%',
                        opacity: 0,
                      }}
                    />
                  )
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
        {deck.length !== 2 && (
          <Box textAlign="center">
            <AddIcon
              fontSize="large"
              sx={{
                transform: 'rotate(-90deg)',
              }}
            />
          </Box>
        )}
        <Grid container spacing={1}>
          {deck.length !== 2 &&
            composition.pool.slice(0, 3).map((booster, index) => (
              <Grid
                key={`${index} ${booster.TKey} #${booster.variant}`}
                item
                xs={4}
              >
                <Button
                  sx={theme => ({
                    padding: 0,
                    borderRadius: 2,
                    transition: theme.transitions.create([
                      'box-shadow',
                      'transform',
                    ]),
                    '&:hover': {
                      transform: 'scale(1.05)',
                      zIndex: 1,
                    },
                  })}
                  onClick={_ => {
                    addBoosterToCurrentDeck(booster)
                  }}
                >
                  <BoosterCard booster={booster} withFeatured />
                </Button>
              </Grid>
            ))}
        </Grid>
      </AccordionDetails>
      {deck.length === 2 && (
        <AccordionActions>
          <Button
            color="error"
            disabled={onHold}
            onClick={_ => deleteDeck(index)}
          >
            {t('resign')}
          </Button>
        </AccordionActions>
      )}
    </Accordion>
  )
}

export default DeckAccordion
