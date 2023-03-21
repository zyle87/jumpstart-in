import AddIcon from '@mui/icons-material/Add'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import LinkIcon from '@mui/icons-material/OpenInNew'
import RemoveIcon from '@mui/icons-material/Remove'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { FC, useCallback, useContext, useMemo, useState } from 'react'
import MTGColorIcon from '../components/MTGColorIcon'
import { data } from '../data'
import { useCollection } from '../hooks/useCollection'
import { useComposition } from '../hooks/useComposition'
import { useMTGTools } from '../hooks/useMTGTools'
import { TranslateContext } from '../hooks/useTranslate'

const CollectionPage: FC = () => {
  const {
    collection,
    addToCollection,
    removeFromCollection,
    importCollection,
    exportCollection,
    stringifiedCollection,
    setStringifiedCollection,
  } = useCollection()
  const { currentDeck } = useComposition()
  const { t } = useContext(TranslateContext)
  const { getHexFromRarity } = useMTGTools()

  const [boosterSetToExpand, setBoosterSetToExpand] =
    useState<Nullable<string>>(null)
  const [boosterColorToExpand, setBoosterColorToExpand] =
    useState<Nullable<string>>(null)
  const [imageToShowcase, setImageToShowcase] = useState<Nullable<string>>(null)
  const [atPosition, setAtPosition] = useState([0, 0])

  const onHold = useMemo(
    () => currentDeck && currentDeck.length !== 2,
    [currentDeck]
  )

  const hasCompletedRarity = useCallback(
    (set: MTG.Set, color: MTG.Color, rarity: MTG.Rarity) =>
      set.boosters
        .filter(booster => booster.color === color)
        .filter(booster => booster.rarity === rarity)
        .every(booster =>
          JSON.stringify(collection).includes(JSON.stringify(booster))
        ),
    [collection]
  )

  return (
    <Box>
      <Box>
        <Box mb={2}>
          {onHold && (
            <Alert severity="warning" variant="filled">
              {t('finish_deck_before_edit')}
            </Alert>
          )}
        </Box>
        <Box>
          {data.sets.map(set => (
            <Accordion
              key={set.id}
              disabled={set.id === 'JMP' || onHold}
              expanded={boosterSetToExpand === set.id}
              onChange={(event, isExpanded) => {
                if ((event?.target as HTMLElement).closest('.mtg-wiki-link')) {
                  return
                }

                setBoosterColorToExpand(null)
                setBoosterSetToExpand(isExpanded ? set.id : null)
              }}
            >
              <AccordionSummary sx={{ cursor: 'default' }}>
                <Box
                  alignItems="center"
                  display="flex"
                  justifyContent="space-between"
                  width={1}
                >
                  <Box display="flex" alignItems="center">
                    <Box mr={2} width={32} textAlign="center">
                      <i
                        className={`ss ss-${set.id.toLowerCase()} ss-2x`}
                        title={set.name}
                      />
                    </Box>
                    <Typography>{set.name}</Typography>
                  </Box>
                  <IconButton
                    className="mtg-wiki-link"
                    href={set.wiki}
                    target="_blank"
                    title={t('open_wiki')}
                  >
                    <LinkIcon />
                  </IconButton>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                {[...new Set(set.boosters.map(booster => booster.color))].map(
                  color => (
                    <Accordion
                      key={color}
                      elevation={4}
                      expanded={boosterColorToExpand === `${set.id}-${color}`}
                      onChange={(_, isExpanded) => {
                        setBoosterColorToExpand(
                          isExpanded ? `${set.id}-${color}` : null
                        )
                      }}
                    >
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Box
                          alignItems="center"
                          display="flex"
                          justifyContent="space-between"
                          mr={1}
                          position="relative"
                          width={1}
                        >
                          <Box display="flex" alignItems="center">
                            <Box mr={2}>
                              <MTGColorIcon type={color} />
                            </Box>
                            <Typography>{t(color)}</Typography>
                          </Box>
                          <Box display="flex" alignItems="center">
                            {[...data.rarities].reverse().map(rarity =>
                              set.boosters
                                .filter(booster => booster.rarity === rarity)
                                .filter(booster => booster.color === color)
                                .length ? (
                                <Box
                                  key={rarity}
                                  mr={1}
                                  sx={{
                                    opacity: hasCompletedRarity(
                                      set,
                                      color,
                                      rarity
                                    )
                                      ? 1
                                      : 0.2,
                                    color: getHexFromRarity(rarity),
                                  }}
                                >
                                  <i
                                    className={`ss ss-${set.id.toLowerCase()} ss-2x`}
                                    title={t(rarity)}
                                  />
                                </Box>
                              ) : null
                            )}
                          </Box>
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails>
                        {[
                          ...new Set(
                            set.boosters.map(booster => booster.rarity)
                          ),
                        ].map(rarity =>
                          rarity !== 'mythic' &&
                          color === 'colorless' ? null : (
                            <Box
                              key={rarity}
                              sx={{ '&:not(:last-child)': { mb: 3 } }}
                            >
                              <Box mb={3}>
                                <Typography
                                  variant="caption"
                                  color={getHexFromRarity(rarity)}
                                >
                                  {t(rarity).toUpperCase()}
                                </Typography>
                              </Box>
                              {set.boosters
                                .filter(booster => booster.rarity === rarity)
                                .filter(booster => booster.color === color)
                                .map(booster => (
                                  <Box
                                    key={`${booster.id}-${booster.variant}`}
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    sx={{
                                      '&:not(:last-child)': { mb: 1 },
                                    }}
                                  >
                                    <Box
                                      onPointerEnter={event => {
                                        const position =
                                          event.currentTarget.getBoundingClientRect()

                                        setAtPosition([
                                          position.top,
                                          position.left,
                                        ])
                                        setImageToShowcase(booster.front)
                                      }}
                                      onPointerLeave={_ => {
                                        setImageToShowcase(null)
                                      }}
                                      sx={{ cursor: 'crosshair' }}
                                    >
                                      <Typography>
                                        {booster.TKey} #{booster.variant}
                                      </Typography>
                                    </Box>
                                    <Box
                                      flexGrow={1}
                                      mx={3}
                                      height="1px"
                                      sx={theme => ({
                                        background: theme.palette.divider,
                                        opacity: 0.3,
                                      })}
                                    ></Box>
                                    <Box display="flex" alignItems="center">
                                      <IconButton
                                        color="error"
                                        disabled={
                                          !collection.filter(
                                            entry =>
                                              JSON.stringify(entry) ===
                                              JSON.stringify(booster)
                                          ).length
                                        }
                                        onClick={_ => {
                                          removeFromCollection(booster)
                                        }}
                                      >
                                        <RemoveIcon />
                                      </IconButton>
                                      <Typography
                                        sx={{ textAlign: 'center', width: 50 }}
                                      >
                                        {
                                          collection.filter(
                                            entry =>
                                              JSON.stringify(entry) ===
                                              JSON.stringify(booster)
                                          ).length
                                        }
                                      </Typography>
                                      <IconButton
                                        color="primary"
                                        onClick={_ => {
                                          addToCollection(booster)
                                        }}
                                      >
                                        <AddIcon />
                                      </IconButton>
                                    </Box>
                                  </Box>
                                ))}
                            </Box>
                          )
                        )}
                      </AccordionDetails>
                    </Accordion>
                  )
                )}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
        <Box my={3}>
          <Divider />
        </Box>
        <TextField
          disabled={onHold}
          fullWidth
          multiline
          rows={5}
          onChange={event => {
            setStringifiedCollection(event.target.value)
          }}
          value={stringifiedCollection}
        />
        <Box mt={1} textAlign="right">
          <Button disabled={onHold} onClick={importCollection}>
            {t('import')}
          </Button>
          <Button disabled={onHold} onClick={exportCollection}>
            {t('export')}
          </Button>
        </Box>
      </Box>
      <Box
        position="fixed"
        top={atPosition[0] - 160}
        left={atPosition[1] + 160}
      >
        {imageToShowcase && (
          <img
            src={imageToShowcase}
            style={{ height: 320, borderRadius: 8 }}
            alt="Insight"
          />
        )}
      </Box>
    </Box>
  )
}

export default CollectionPage
