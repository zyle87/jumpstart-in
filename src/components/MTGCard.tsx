import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { FC, useState } from 'react'
import { useMTGTools } from '../hooks/useMTGTools'

type Props = { booster: MTG.Booster; withFeatured?: boolean }

const MTGCard: FC<Props> = ({ booster, withFeatured }) => {
  const { getSetFromBooster, getHexFromRarity } = useMTGTools()
  const [showFeatured, setShowFeatured] = useState(false)

  return (
    <Box
      position="relative"
      overflow="hidden"
      onPointerEnter={_ => {
        setShowFeatured(true)
      }}
      onPointerLeave={_ => {
        setShowFeatured(false)
      }}
      borderRadius={2}
    >
      <img
        src={booster.front}
        alt={`${booster.TKey} #${booster.variant}`}
        style={{
          display: 'block',
          width: '100%',
        }}
      />
      {Array.from({ length: 2 }).map((_, index) => (
        <Box
          key={index}
          alignItems="center"
          display="flex"
          justifyContent="center"
          left={index === 0 ? 24 : undefined}
          position="absolute"
          right={index === 1 ? 24 : undefined}
          top={24}
          sx={theme => ({
            backdropFilter: 'blur(20px)',
            borderRadius: theme.spacing(3),
            color: theme.palette.common.white,
            cursor: 'pointer',
            fontWeight: theme.typography.body2,
            height: theme.spacing(6),
            width: theme.spacing(6),
          })}
        >
          {index === 0 ? (
            <i
              className={`ss ss-${getSetFromBooster(
                booster
              ).toLowerCase()} ss-2x`}
              style={{
                color:
                  index === 0 ? getHexFromRarity(booster.rarity) : 'inherit',
              }}
            />
          ) : (
            <Typography>{`#${booster.variant}`}</Typography>
          )}
        </Box>
      ))}
      {withFeatured && showFeatured && booster.featured && (
        <img
          src={booster.featured}
          alt={`${booster.TKey} #${booster.variant}`}
          style={{
            display: 'block',
            borderRadius: 12,
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
          }}
        />
      )}
    </Box>
  )
}

export default MTGCard
