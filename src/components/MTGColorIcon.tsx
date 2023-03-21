import { FC, useCallback } from 'react'

type Props = {
  type: MTG.Color
  size?: number
}

const MTGColorIcon: FC<Props> = ({ type, size }) => {
  const renderVector = useCallback(() => {
    switch (type) {
      case 'white':
        return (
          <>
            <circle
              cx={16}
              cy={16}
              r={16}
              style={{
                fill: '#fcf9e1',
              }}
            />
            <path d="M31.19 18.25c-2.09-1.18-3.43-1.77-4.02-1.77-.43 0-.76.33-1 .98s-.72.98-1.45.98c-.29 0-.9-.11-1.81-.32-.51.78-.76 1.27-.76 1.49 0 .29.22.64.66 1.05s.81.6 1.11.6c.19 0 .45-.04.78-.12.33-.08.55-.12.66-.12.33 0 .49.6.49 1.81s-.27 2.92-.8 5.3c-.7-2.73-1.43-4.1-2.21-4.1-.11 0-.33.08-.66.24-.33.16-.58.24-.74.24-.78 0-1.47-.71-2.09-2.13-1.23.19-1.85.82-1.85 1.89 0 .54.25.96.74 1.29.49.32.74.55.74.68 0 .72-1.06 1.84-3.18 3.34-1.12.8-1.9 1.37-2.33 1.69.37-.48.75-1.11 1.13-1.89.43-.88.64-1.57.64-2.05 0-.27-.31-.64-.92-1.13s-.92-.99-.92-1.53c0-.46.16-1.02.48-1.69-.35-.4-.76-.6-1.25-.6-1.07 0-1.61.35-1.61 1.05v1.09c.03.88-.64 1.33-2.01 1.33-1.04 0-2.8-.24-5.26-.72 2.79-.7 4.18-1.5 4.18-2.41 0 .11-.05-.21-.16-.96-.11-.83.48-1.58 1.77-2.25-.24-1.23-.88-1.85-1.93-1.85-.16 0-.46.28-.88.84-.43.56-.83.84-1.2.84-.64 0-1.47-.7-2.49-2.09-.48-.7-1.22-1.73-2.21-3.09.62.32 1.23.64 1.85.96.8.37 1.45.56 1.93.56.38 0 .74-.33 1.11-.98s.84-.98 1.43-.98c.08 0 .62.16 1.61.48.51-.78.76-1.35.76-1.73 0-.32-.19-.69-.58-1.11s-.74-.62-1.07-.62c-.13 0-.34.04-.62.12-.28.08-.49.12-.62.12-.48 0-.72-.6-.72-1.81 0-.32.31-2.16.92-5.5-.03.4.15 1.15.52 2.25.46 1.34.99 2.01 1.61 2.01.11 0 .32-.08.64-.24s.58-.24.76-.24c.62 0 1.12.35 1.53 1.04l.6 1.09c.56 0 1.03-.2 1.41-.6s.56-.88.56-1.45-.25-1.04-.74-1.35-.74-.54-.74-.7c0-.56.88-1.51 2.65-2.85C17.05 1.56 17.97.93 18.4.74c-1.15 1.55-1.73 2.69-1.73 3.42 0 .38.23.78.68 1.21.56.51.88.87.96 1.09.27.62.24 1.46-.08 2.53.72.51 1.27.76 1.65.76.78 0 1.17-.4 1.17-1.21 0-.08-.03-.33-.1-.76s-.09-.67-.06-.72c.11-.38.84-.56 2.21-.56.86 0 2.64.24 5.34.72l-2.65.72c-1.07.32-1.61.68-1.61 1.09 0 .19.07.51.2.96s.2.79.2 1c0 .37-.24.72-.72 1.04l-1.37.96c.32.59.54.94.64 1.04.27.32.63.48 1.09.48.32 0 .62-.28.88-.84s.7-.84 1.29-.84c.72 0 1.54.67 2.45 2.01.51.75 1.3 1.89 2.37 3.42Zm-8.92-2.33c0-1.71-.63-3.2-1.89-4.46s-2.75-1.89-4.46-1.89-3.24.62-4.5 1.87-1.9 2.74-1.93 4.48c-.03 1.71.61 3.19 1.91 4.44 1.3 1.25 2.81 1.87 4.52 1.87 1.82 0 3.34-.6 4.56-1.79 1.22-1.19 1.82-2.7 1.79-4.52Zm-.6 0c0 1.63-.55 2.99-1.65 4.06-1.1 1.07-2.47 1.61-4.1 1.61s-2.93-.55-4.06-1.65c-1.12-1.1-1.69-2.44-1.69-4.02s.57-2.89 1.71-4c1.14-1.11 2.49-1.67 4.04-1.67s2.9.56 4.04 1.69c1.14 1.13 1.71 2.45 1.71 3.98Z" />
          </>
        )
      case 'blue':
        return (
          <>
            <circle
              cx={16}
              cy={16}
              r={16}
              style={{
                fill: '#cae0ef',
              }}
            />
            <path d="M21.64 26.38c-1.51 1.54-3.37 2.3-5.57 2.3-2.48 0-4.44-.85-5.9-2.54-1.37-1.62-2.06-3.68-2.06-6.18 0-2.69 1.17-5.76 3.51-9.21 1.91-2.83 4.16-5.3 6.74-7.43-.38 1.72-.57 2.95-.57 3.68 0 1.67.52 3.3 1.57 4.89 1.29 1.88 2.27 3.29 2.95 4.2 1.05 1.59 1.57 3.14 1.57 4.64 0 2.23-.75 4.12-2.26 5.65Zm-.04-8.62c-.4-.9-.87-1.5-1.41-1.8.08.16.12.39.12.69 0 .57-.16 1.37-.49 2.42l-.52 1.62c0 .94.47 1.41 1.41 1.41 1 0 1.49-.66 1.49-1.98 0-.67-.2-1.46-.61-2.36Z" />
          </>
        )
      case 'black':
        return (
          <>
            <circle
              cx={16}
              cy={16}
              r={16}
              style={{
                fill: '#cbbeb5',
              }}
            />
            <path d="M28.83 15.56c0 1.74-.63 2.93-1.9 3.56-.37.18-1.53.43-3.48.75-1.27.21-1.9.7-1.9 1.46v3.2c0 .13.04.54.12 1.23l.12 1.27c0 .4-.09 1.04-.28 1.94-.5.1-1.08.22-1.74.36-.21-.79-.32-1.33-.32-1.62 0-.13.03-.33.1-.59.06-.26.1-.46.1-.59 0-.18-.16-.7-.49-1.54h-.61c-.08.13-.11.3-.08.51.1.45.14.83.12 1.15-.45.32-1.07.74-1.86 1.27-.18-.05-.25-.08-.2-.08v-2.81c-.05-.13-.18-.18-.4-.16h-.47l-.47 3.72c-.37.03-.82.03-1.34 0-.19-.87-.51-2.16-.99-3.88h-.32c-.29.92-.45 1.43-.47 1.5 0 .1.03.31.1.61.06.3.1.51.1.61 0 .08-.03.28-.08.59l-.12.95a.28.28 0 0 1-.2.08c-.79 0-1.32-.2-1.58-.59-.26-.4-.37-.95-.32-1.66l.32-4.75c0-.08.03-.18.08-.32.05-.13.08-.22.08-.28 0-.21-.22-.63-.67-1.27-.08-.03-.49-.12-1.23-.28-.45-.1-1.33-.29-2.65-.55-1.82-.34-2.73-1.81-2.73-4.39 0-3.85 1.58-7.05 4.75-9.61.13.71.36 1.66.67 2.85.24.05.75.17 1.54.36.16.05.96.34 2.41.87-.74-.45-1.7-1.17-2.89-2.18-.45-.53-.67-1.41-.67-2.65 0-.29.5-.63 1.5-1.03.9-.37 1.57-.58 2.02-.63 1.42-.18 2.52-.28 3.28-.28 3.3 0 5.96.84 7.99 2.53-.66.76-1.79 1.58-3.4 2.45.63.03 1.56-.22 2.77-.75s1.73-.79 1.54-.79c.21 0 .63.42 1.27 1.27.47.63.86 1.2 1.15 1.7.84 1.5 1.41 3.13 1.7 4.86 0 .61.01 1.04.04 1.31v.32Zm-15.15.71c0-1.13-.49-2.21-1.48-3.22s-2.05-1.52-3.18-1.52c-1 0-1.89.42-2.65 1.27s-1.15 1.79-1.15 2.83c0 .9.43 1.49 1.31 1.75.55.16 1.33.25 2.33.28h2.18c1.77.03 2.65-.43 2.65-1.38Zm4.31 4.9v-1.23c-.18-.34-.37-.7-.55-1.07-.16-.53-.45-1.27-.87-2.22l-.44 4.63c0 .37-.08.55-.24.55-.1 0-.18-.03-.24-.08-.18-2.8-.28-4.01-.28-3.64v-1.38c-.05-.08-.12-.12-.2-.12-.9.92-1.34 2.41-1.34 4.47 0 1.13.1 1.83.32 2.1.21-.05.45-.14.71-.28.1-.05.41-.08.91-.08s1.11.16 1.82.47c.26 0 .4-.71.4-2.13Zm8.94-5.51c0-1.06-.4-2.01-1.19-2.85s-1.7-1.25-2.73-1.25c-1.11 0-2.14.51-3.11 1.52s-1.44 2.08-1.44 3.18c0 .92.45 1.38 1.34 1.38h4.55c1.71-.03 2.57-.69 2.57-1.99Z" />
          </>
        )
      case 'red':
        return (
          <>
            <circle
              cx={16}
              cy={16}
              r={16}
              style={{
                fill: '#f5a477',
              }}
            />
            <path d="M28.39 21.05c-1.12 2.66-3.33 3.99-6.65 3.99-.61 0-1.27.08-1.98.23-1.06.23-1.6.55-1.6.95 0 .13.09.27.27.44.18.16.33.25.46.25-.63 0-.2.02 1.29.06s2.43.06 2.81.06c-2.2 1.29-5.89 1.89-11.05 1.79-1.7-.02-3.15-.77-4.37-2.24-1.19-1.39-1.79-2.95-1.79-4.67 0-1.82.61-3.37 1.84-4.65 1.23-1.28 2.75-1.92 4.58-1.92.41 0 .94.09 1.61.27s1.12.27 1.35.27c.94 0 2.1-.39 3.5-1.16s2.05-1.16 1.98-1.16c-.25 2.66-1.14 4.45-2.66 5.36-1.09.63-1.63 1.25-1.63 1.86 0 .38.23.68.68.91.35.18.75.27 1.18.27.66 0 1.3-.41 1.94-1.22.63-.81.91-1.54.84-2.2-.08-.76-.02-1.67.15-2.73.05-.3.23-.68.55-1.12s.6-.72.85-.82c0 .23-.08.61-.25 1.14s-.25.93-.25 1.18c0 .56.15.99.46 1.29.46-.18.86-.75 1.22-1.71.3-.73.48-1.44.53-2.13-1.06-.05-2.08-.53-3.06-1.44s-1.46-1.9-1.46-2.96c0-.18.02-.35.08-.53.15.23.38.58.68 1.06.43.63.76.95.99.95.3 0 .46-.32.46-.95 0-.81-.22-1.54-.65-2.2-.48-.79-1.1-1.18-1.86-1.18-.35 0-.89.19-1.59.57-.71.38-1.36.57-1.94.57-.18 0-.96-.23-2.36-.68 2.46-.4 3.68-.77 3.68-1.1 0-.86-1.68-1.44-5.05-1.75-.33-.02-.94-.08-1.82-.15.1-.13.82-.27 2.17-.42 1.14-.13 1.94-.19 2.39-.19 6.03 0 9.85 2.93 11.47 8.78.28-.23.42-.62.42-1.16 0-.69-.2-1.57-.61-2.62-.15-.41-.39-1.03-.72-1.85 2.08 2.65 3.12 5.15 3.12 7.52 0 1.25-.29 2.38-.87 3.4-.38.69-1.09 1.56-2.13 2.63-1.04 1.07-1.75 1.9-2.13 2.48 1.39-.38 2.31-.67 2.74-.87.96-.43 1.84-1.08 2.62-1.94 0 .33-.14.82-.42 1.48ZM11.83 6.12c0 .46-.25.75-.76.87l-.99.15c-.35.18-.87.87-1.56 2.09-.08-.38-.19-.91-.34-1.6-.23.03-.61.23-1.14.61-.23.18-.6.44-1.1.8.15-.91.66-1.83 1.52-2.77.91-1.04 1.8-1.56 2.66-1.56 1.14 0 1.71.47 1.71 1.41Zm6.61 3.49c0 .43-.23.79-.7 1.08s-.93.44-1.39.44c-.61 0-1.15-.34-1.63-1.03-.58-.84-1.18-1.38-1.79-1.63a.62.62 0 0 1 .46-.19c.23 0 .61.18 1.16.53s.89.53 1.05.53c.13 0 .34-.18.63-.53.29-.36.61-.53.97-.53.84 0 1.25.44 1.25 1.33Z" />
          </>
        )
      case 'green':
        return (
          <>
            <circle
              cx={16}
              cy={16}
              r={16}
              style={{
                fill: '#a8c796',
              }}
            />
            <path d="M28.96 17.61c0 .5-.19.94-.57 1.34s-.82.59-1.32.59c-.79 0-1.37-.37-1.74-1.11l-1.74-.07c-.37 0-1.1.16-2.19.48-1.16.32-1.83.58-2 .78-.27.3-.49.99-.67 2.08-.15.89-.22 1.54-.22 1.97 0 .67.1 1.16.31 1.46s.64.57 1.3.78c.65.21 1.06.33 1.21.35.1 0 .26-.01.48-.04h.44c.32 0 .65.05 1 .15.49.15.71.35.63.59-.35-.05-.95.02-1.82.22l1.04.52c0 .3-.42.44-1.26.44-.22 0-.53-.05-.91-.15-.38-.1-.64-.15-.76-.15h-.48c-.02.25-.1.62-.22 1.11-.42-.02-.91-.27-1.48-.74s-.93-.7-1.07-.7-.36.24-.63.7c-.27.47-.41.79-.41.96-.32-.17-.59-.5-.82-.96-.1-.32-.21-.64-.33-.96-.25.02-.71.54-1.37 1.56h-.19c-.05-.07-.24-.59-.56-1.56-.77-.25-1.48-.37-2.15-.37-.32 0-.82.07-1.48.22l-1.04-.07c.15-.15.58-.43 1.3-.85.84-.49 1.48-.74 1.93-.74.07 0 .17.01.3.04.12.03.22.04.3.04.17 0 .45-.09.83-.28.38-.18.61-.35.67-.5.06-.15.09-.53.09-1.15 0-1.41-.37-2.46-1.11-3.15-.64-.62-1.71-1.06-3.19-1.34-.4 1.41-1.51 2.11-3.34 2.11-.59 0-1.19-.36-1.78-1.07s-.89-1.37-.89-1.97c0-.91.38-1.67 1.15-2.26-.62-.64-.93-1.3-.93-1.96 0-.62.19-1.16.57-1.63.38-.47.88-.74 1.5-.82-.05-.79.21-1.33.78-1.63-.27-.27-.41-.75-.41-1.44 0-.82.27-1.5.82-2.04s1.22-.82 2.04-.82c.89 0 1.62.31 2.19.93.72-2.45 2.26-3.67 4.63-3.67 1.24 0 2.32.49 3.26 1.48.35.37.52.57.52.59-.3 0-.15-.06.44-.17s1.02-.17 1.3-.17c.96 0 1.82.36 2.56 1.07.64.64 1.09 1.46 1.34 2.45.17.02.44.1.82.22.54.27.82.74.82 1.41 0 .12-.1.36-.3.7 1.58.89 2.37 2.13 2.37 3.71 0 .44-.17 1.06-.52 1.85.64.37.96.91.96 1.63Zm-15.27 1.63v-.48c0-.57-.28-1.09-.83-1.56s-1.12-.7-1.69-.7c-.69 0-1.33.16-1.93.48 1.31-.07 2.79.68 4.45 2.26Zm-.67-4.6c-.37-.42-.69-.85-.96-1.3-1.04.27-1.56.58-1.56.93.3-.02.73.03 1.3.17s.98.2 1.22.2Zm2.26-1.15v-1.63c-.59-.1-.95-.15-1.07-.15v.56l1.07 1.22Zm4.82-1.04c-.3-.12-.85-.37-1.67-.74v3.19c1.16-.67 1.72-1.48 1.67-2.45Zm2.04 4.37-.81-1c-.49.35-1 .7-1.5 1.06s-.95.76-1.32 1.21c1.11-.59 2.32-1.01 3.63-1.26Z" />
          </>
        )
      case 'colorless':
        return (
          <>
            <circle
              cx={16}
              cy={16}
              r={16}
              style={{
                fill: '#d8d1ca',
              }}
            />
            <path d="M13.86 7.69c.84-1.18 1.38-2.53 2.14-3.77.73 1.19 1.25 2.5 2.05 3.65 1.69 2.5 3.87 4.68 6.38 6.37 1.16.8 2.47 1.33 3.66 2.06-1.2.72-2.51 1.25-3.66 2.05a23.854 23.854 0 0 0-6.45 6.49c-.76 1.12-1.27 2.38-1.97 3.53-.73-1.19-1.26-2.5-2.05-3.65-1.7-2.5-3.87-4.69-6.38-6.37-1.15-.79-2.46-1.32-3.65-2.06 1.24-.74 2.58-1.29 3.77-2.13 2.41-1.66 4.51-3.77 6.17-6.18ZM8.88 16a28.3 28.3 0 0 1 7.11 7.12c1.93-2.77 4.34-5.2 7.12-7.11-2.78-1.93-5.2-4.34-7.12-7.12A28.426 28.426 0 0 1 8.88 16Z" />
          </>
        )
    }
  }, [type])

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width={size || 32}
      height={size || 32}
      style={{ display: 'block' }}
    >
      {renderVector()}
    </svg>
  )
}

export default MTGColorIcon
