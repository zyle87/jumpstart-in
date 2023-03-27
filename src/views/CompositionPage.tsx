import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Divider from '@mui/material/Divider'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Typography from '@mui/material/Typography'
import { FC, useContext } from 'react'
import DeckAccordion from 'src/components/DeckAccordion'
import { data } from '../data'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import { useComposition } from '../hooks/useComposition'
import { TranslateContext } from '../hooks/useTranslate'
import { settingsActions } from '../store/slices/settingsSlice'

const CompositionPage: FC = () => {
  const dispatch = useAppDispatch()
  const settings = useAppSelector(state => state.settings)
  const { composition, composeNewDeck, currentDeck, onHold } = useComposition()
  const { t } = useContext(TranslateContext)

  return (
    <Box>
      <Box mb={2}>
        {composition.decks.length ? (
          composition.decks.map((deck, index) => (
            <DeckAccordion key={index} deck={deck} index={index} />
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
          <Alert severity="info">
            {t('finish_deck_before_composing_info')}
          </Alert>
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
