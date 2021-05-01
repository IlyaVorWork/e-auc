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
        '& $rating': {
          display: 'none',
        },
        '& $cartButton': {
          display: 'flex',
        },
      },
    },
    name: {
      textDecoration: 'none',
      fontWeight: 400,
      '&:hover': {
        color: theme.palette.secondary.main,
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
      color: theme.palette.primary.contrastText,
      transition: '.05s ease-in-out',
      '&:hover': {
        color: theme.palette.secondary.main,
      },
    },
    slideContainer: {
      width: 32,
      position: 'absolute',
      right: 6,
      top: 20,
    },
    iconAnimation: {
      opacity: 0,
      padding: '4px 0px !important',
      transition: '.1s ease-in-out',
      transform: 'translateX(-10px)',
      '&:nth-child(2)': {
        transitionDelay: '.075s',
      },
    },
    icon: {
      // color: grey[600],
      transition: '.1s ease-in-out',
      '&:hover': {
        color: theme.palette.primary.main,
      },
      cursor: 'pointer',
      color: theme.palette.secondary.main,
    },
    rating: {
      '& svg': {
        width: '1.2rem',
        height: '1.2rem',
      },
      display: 'flex',
      transition: '.1s ease-in-out',
    },
    cartButton: {
      display: 'none',
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
  })
)
