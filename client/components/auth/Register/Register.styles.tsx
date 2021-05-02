import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: '100%',
      maxWidth: 420,
      '&:not(:last-child)': {
        marginBottom: 20,
      },
    },
    heading: {
      marginBottom: '1.5rem',
      fontSize: '30px',
    },
    serviceHeading: {
      textAlign: 'center',
      width: '50px !important',
      margin: '0px 10px 20px 10px',
    },
    formPaper: {
      padding: '24px 40px',
    },
    loginPaper: {
      padding: 20,
    },
    input: {
      marginBottom: 30,
    },
    input_error: {
      marginBottom: 8,
    },
    button: {
      padding: 15,
      marginBottom: 20,
      // color: theme.palette.primary.contrastText,
      '&:hover': {
        backgroundColor: theme.palette.primary.light,
        // color: theme.palette.secondary.contrastText + '!important',
      },
    },
    link: {
      color: theme.palette.primary.light,
    },
    error: {
      color: theme.palette.error.main,
      minHeight: 20,
      margin: '0 0 10px 0',
      width: '100%',
      textAlign: 'center',
    },
    [theme.breakpoints.down('sm')]: {
      container: {
        width: '95%',
      },
    },
  })
)
