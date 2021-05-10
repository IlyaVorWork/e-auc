import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 'auto',
      width: 'auto',
      minWidth: 550,
      padding: 20,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows['1'],
      '&:hover': {
        boxShadow: theme.shadows['4'],
      },
    },
    image: {
      width: 100,
      height: 100,
      marginLeft: 20,
    },
    title: {
      marginRight: 20,
    },
    activeBid: {
      color: 'blue',
    },
    lossBid: {
      color: theme.palette.primary.light,
    },
    winBid: {
      color: 'green',
    },
    bidStatus: {
      fontWeight: 600,
    },
    buyButton: {
      color: theme.palette.primary.contrastText,
    },
  })
)
