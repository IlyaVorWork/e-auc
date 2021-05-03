import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      width: '100%',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
    },
    root: {
      width: '100%',
      transition: 'ease-in-out .2s',
      color: theme.palette.primary.contrastText,
      fontWeight: 300,
      borderStyle: 'solid',
      borderWidth: 1,
      borderRadius: 0,
      borderColor: theme.palette.primary.contrastText,
      padding: '14px 16px 15px 24px',
      backgroundColor: theme.palette.background.paper,
      '&:focus': {
        outline: 'none',
      },
    },
    icon: {
      color: theme.palette.primary.contrastText,
      right: 12,
      position: 'absolute',
      userSelect: 'none',
      pointerEvents: 'none',
      zIndex: 100,
    },
  })
)
