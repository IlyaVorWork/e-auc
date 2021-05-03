import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '20px 0',
    },
    image: {
      width: 80,
      height: 80,
    },
    icon: {
      position: 'absolute',
      bottom: 0,
      right: 20,
      width: '0.5rem',
      height: '0.5rem',
      transition: '.2s ease-in-out',
      '&:hover': {
        color: theme.palette.secondary.main,
      },
      cursor: 'pointer',
    },
    productMini: {
      position: 'relative',
      // paddingRight: 24,
    },
    link: {
      maxWidth: '235px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      borderBottom: '1px dashed #e0e0e0',
    },
    [theme.breakpoints.between(1280, 1805)]: {
      link: {
        maxWidth: '150px',
      },
    },
    [theme.breakpoints.down(1500)]: {
      mainCartMini: {
        display: 'none',
      },
    },
  })
)
