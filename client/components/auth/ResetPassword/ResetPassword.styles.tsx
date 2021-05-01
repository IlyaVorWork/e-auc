import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: '100%',
      maxWidth: 400,
      '&:not(:last-child)': {
        marginBottom: 10,
      },
    },
    heading: {
      textAlign: 'center',
      marginBottom: '1.5rem',
      fontSize: '25px',
      '& span': { lineHeight: '35px' },
    },
    link: {
      color: theme.palette.primary.light,
    },
    formPaper: {
      padding: '24px 40px',
    },
    registerPaper: {
      marginTop: 20,
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
    },
    error: {
      color: theme.palette.error.main,
      minHeight: 20,
      margin: '0 0 10px 0',
      width: '100%',
      textAlign: 'center',
    },
  })
)
