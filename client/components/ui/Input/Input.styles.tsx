import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

// import grey from '@material-ui/core/colors/grey'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      '& > label': {
        fontSize: '0.8rem',
      },
      '& > div': {
        borderRadius: 0,
        // '&:hover, &:focus, &:active': {
        //   backgroundColor: grey[200],
        // },
      },
      '& > div > input': {
        padding: '16px 14px',
      },
      '& + p': {
        height: 0,
      },
      color: '#ffffff !important',
      border: 'none !important',
      outline: 'none !important',
      '& div': {
        borderRadius: '30px 30px 30px 30px',
        color: theme.palette.primary.contrastText + '!important',
        margin: 0,
      },
      '& label': {
        color: theme.palette.primary.contrastText + '!important',
      },
      '& fieldset': {
        borderColor: theme.palette.primary.contrastText + '!important',
        color: theme.palette.primary.contrastText + '!important',
      },
    },
  })
)
