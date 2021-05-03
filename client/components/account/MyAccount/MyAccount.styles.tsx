import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    headline: {
      width: '100%',
      paddingBottom: 20,
    },
    divider: {
      backgroundColor: theme.palette.primary.contrastText,
    },
    root: {
      flexGrow: 1,
      display: 'flex',
      marginTop: 20,
    },
  })
)
