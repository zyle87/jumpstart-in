import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AddIcon from '@mui/icons-material/ForwardRounded'
import Accordion from '@mui/material/Accordion'
import AccordionActions from '@mui/material/AccordionActions'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { darken, lighten, useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { FC, useContext } from 'react'
import MTGCard from '../components/MTGCard'
import MTGColorIcon from '../components/MTGColorIcon'
import { data } from '../data'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import { useComposition } from '../hooks/useComposition'
import { useMTGTools } from '../hooks/useMTGTools'
import { TranslateContext } from '../hooks/useTranslate'
import { compositionActions } from '../store/slices/compositionSlice'
import { settingsActions } from '../store/slices/settingsSlice'

const CompositionPage: FC = () => {
  const dispatch = useAppDispatch()
  const settings = useAppSelector(state => state.settings)
  const {
    composition,
    composeNewDeck,
    addBoosterToCurrentDeck,
    currentDeck,
    onHold,
  } = useComposition()
  const { t } = useContext(TranslateContext)
  const { getHexFromColor, getSetFromBooster, getCombinationFromDeck } =
    useMTGTools()
  const theme = useTheme()
  const mqUpMd = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <Box>
      <Box mb={2}>
        {composition.decks.length ? (
          composition.decks.map((deck, index) => (
            <Accordion key={index} defaultExpanded={deck.length !== 2}>
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
                              <MTGColorIcon
                                type={deck[boosterIndex].color}
                                size={24}
                              />
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
                          {deck.length === 2 && (
                            <i className="ss ss-dpa ss-2x" />
                          )}
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
                          <MTGCard booster={deck[boosterIndex]} />
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
                          <MTGCard booster={booster} withFeatured />
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
                    onClick={_ =>
                      dispatch(compositionActions.deleteDeck(index))
                    }
                  >
                    {t('resign')}
                  </Button>
                </AccordionActions>
              )}
            </Accordion>
          ))
        ) : (
          <Alert severity="info">{t('no_deck_composed_yet')}</Alert>
        )}
      </Box>
      <Box my={3}>
        <Divider />
      </Box>
      <Box mb={2}>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{t('included_sets')}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box>
              <FormGroup>
                {data.sets.map(set => (
                  <FormControlLabel
                    key={set.id}
                    control={
                      <Checkbox
                        disabled={onHold}
                        checked={settings.includedSets.indexOf(set.id) > -1}
                        onChange={event => {
                          const id = set.id

                          dispatch(
                            event.currentTarget.checked
                              ? settingsActions.allowSet({ id })
                              : settingsActions.disallowSet({ id })
                          )
                        }}
                      />
                    }
                    label={
                      <Box
                        ml={1}
                        display="flex"
                        alignItems="center"
                        height={48}
                      >
                        <Box mr={2} width={32} textAlign="center">
                          <i
                            className={`ss ss-${set.id.toLowerCase()} ss-2x`}
                          />
                        </Box>
                        <Typography>{set.name}</Typography>
                      </Box>
                    }
                  />
                ))}
              </FormGroup>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
      {currentDeck && currentDeck.length !== 2 && (
        <Box mb={1}>
          <Alert severity="info">{t('finish_deck_before_compose')}</Alert>
        </Box>
      )}
      {composition.pool.length < 4 && (
        <Alert severity="error">{t('poor_pool_error')}</Alert>
      )}
      <Box mt={2}>
        <Button
          disabled={
            composition.pool.length < 4 ||
            (currentDeck && currentDeck.length !== 2)
          }
          variant="contained"
          fullWidth
          size="large"
          onClick={composeNewDeck}
        >
          {t('compose_new_deck')}
        </Button>
      </Box>
    </Box>
  )
}

export default CompositionPage
