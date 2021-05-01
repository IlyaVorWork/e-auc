import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 550,
      position: 'relative',
      padding: 0,
      '&:hover $icon': {
        opacity: 1,
      },
    },
    slide: {
      width: '100%',
      height: '100%',
      position: 'relative',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      transition: '.2s ease-in-out',
      padding: '52px 80px',
    },
    contents: {
      position: 'absolute',
      maxWidth: 440,
      width: '66vw',
      left: 80,
      // top: 70,
    },
    icon: {
      transition: '.2s ease-in-out',
      opacity: 0,
      color: '#fafafa',
      cursor: 'pointer',
      width: 'auto',
      height: '4rem',
      position: 'absolute',
      top: 'calc(50% - 2rem)',
      '&:first-of-type': {
        left: '.5rem',
      },
      '&:last-child': {
        right: '.5rem',
      },
    },
    title: {
      color: '#ffffff',
      fontSize: 70,
      lineHeight: '80px',
      fontWeight: 700,
      margin: 0,
    },
    subtitle: {
      color: '#fafafa',
      fontSize: '1.2rem',
      lineHeight: '2rem',
      fontWeight: 400,
      margin: '20px 0',
    },
    button: {
      // bottom: 52,
      color: theme.palette.secondary.contrastText,
      borderColor: theme.palette.secondary.contrastText,
      '&:hover': {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.secondary.contrastText,
      },
    },
    [theme.breakpoints.down(1024.5)]: {
      root: {
        height: '330px',
      },
      title: {
        width: '85%',
        fontSize: 45,
        lineHeight: '45px',
      },
      subtitle: {
        width: '80%',
        fontSize: '1.2rem',
        lineHeight: '1.6rem',
      },
      slide: {
        padding: '52px 30px',
      },
      contents: {
        left: 30,
      },
    },
    [theme.breakpoints.down(768.5)]: {
      title: {
        width: '75%',
        fontSize: 45,
        lineHeight: '45px',
      },
      subtitle: {
        width: '70%',
        fontSize: '1.2rem',
        lineHeight: '1.6rem',
      },
    },
  })
)
