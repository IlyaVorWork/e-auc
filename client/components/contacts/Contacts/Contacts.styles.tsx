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
    heading: {
      textTransform: 'uppercase',
      letterSpacing: '.2px',
    },
    subHeading: {
      maxWidth: 450,
      width: '66vw',
      margin: 'auto',
    },
    root: {
      flexGrow: 1,
      display: 'flex',
      marginTop: 20,
      paddingBottom: 40,
    },
    contactContanier: {
      padding: 16,
      '& img': {
        width: '100%',
      },
    },
    button: {
      padding: '12px 24px',
      color: theme.palette.primary.contrastText,
      '&:hover': {
        backgroundColor: theme.palette.primary.light + '!important',
      },
    },
  })
)
