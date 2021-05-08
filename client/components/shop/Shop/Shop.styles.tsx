import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    body: {
      padding: '0px !important',
    },
    headline: {
      width: '100%',
      paddingBottom: 20,
    },
    root: {
      marginBottom: '3rem',
      flexGrow: 1,
      display: 'flex',
      marginTop: 20,
      paddingBottom: 40,
    },
    side: {
      padding: '0 40px',
    },
    divider: {
      backgroundColor: theme.palette.primary.contrastText,
    },
    categoryLink: {
      marginTop: 8,
    },
    activeLink: {
      color: theme.palette.secondary.main,
    },
    categoryDivider: {
      marginTop: 8,
    },
    categoryIcon: {
      height: 14,
      width: 14,
    },
    activeIcon: {
      color: theme.palette.secondary.main,
    },
    hits: {},
    thumb: {
      height: 341,
      width: 257,
      padding: 0,
    },
  })
)
