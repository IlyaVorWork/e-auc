import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 'auto',
      padding: '20px 16px',
      width: 233,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows['1'],
      '&:hover': {
        boxShadow: theme.shadows['4'],
      },
    },
    name: {
      textDecoration: 'none',
      fontWeight: 400,
      '&:hover': {
        color: theme.palette.primary.light + '!important',
      },
      '& > *': {
        width: 'fit-content',
        borderBottom: '1px dashed #e0e0e0',
      },
    },
    imageContainer: {
      height: 180,
      display: 'flex',
      justifyContent: 'center',
    },
    image: {
      height: '100%',
    },
    link: {
      color: theme.palette.primary.contrastText + '!important',
      transition: '.05s ease-in-out',
      '&:hover': {
        color: theme.palette.primary.light + '!important',
      },
    },
    slideContainer: {
      width: 32,
      position: 'absolute',
      right: 8,
      top: 20,
    },
    icon: {
      transition: '.1s ease-in-out',
      '&:hover': {
        backgroundColor: 'transparent',
        color: theme.palette.primary.main + '!important',
      },
      cursor: 'pointer',
    },
    rating: {
      '& svg': {
        width: '1.2rem',
        height: '1.2rem',
      },
      display: 'flex',
      transition: '.1s ease-in-out',
    },
    primaryButton: {
      padding: '2px 8px',
      fontSize: '14px',
      color: theme.palette.primary.contrastText + ' !important',
      '&:hover': {
        backgroundColor: theme.palette.primary.light,
      },
    },
    actions: {
      minHeight: 30,
    },
    [theme.breakpoints.down('sm')]: {
      root: {
        '&:hover': {
          boxShadow: theme.shadows['4'],
          '& $rating': {
            display: 'flex',
          },
          '& $cartButton': {
            display: 'none',
          },
        },
      },
    },
  })
)
