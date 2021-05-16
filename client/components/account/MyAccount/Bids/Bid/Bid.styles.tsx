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
    name: {
      '& > *': {
        width: 'fit-content',
        borderBottom: '1px dashed #e0e0e0',
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
      '&:hover': {
        backgroundColor: theme.palette.primary.light,
      },
    },
    [theme.breakpoints.down(425.5)]: {
      root: {
        minWidth: '0px !important',
        width: '100%',
      },
      image: {
        marginLeft: 0,
      },
    },
  })
)
