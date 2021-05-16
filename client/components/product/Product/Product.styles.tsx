import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { darken } from '@material-ui/core/styles/colorManipulator'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    side: {
      padding: '0 40px',
    },
    imageContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    image: {
      width: '100%',
    },
    rating: {
      '& svg': {
        width: '1rem',
        height: '1rem',
      },
      display: 'flex',
    },
    buyButton: {
      color: theme.palette.primary.contrastText,
      '&:hover': {
        backgroundColor: theme.palette.primary.light + '!important',
      },
    },
    countInput: {
      width: 100,
      '& > div': {
        marginBottom: 10,
      },
      '& div': {
        '& input': {
          cursor: 'default !important',
        },
      },
    },
    share: {
      border: 'none !important',
    },
    button: {
      borderRadius: 0,
      border: 'none',
      transition: '.1s ease-in-out',
    },
    facebook: {
      color: '#3b5998',
      '&:hover': {
        color: darken('#3b5998', 0.4),
      },
    },
    pinterest: {
      color: '#C8232C',
      '&:hover': {
        color: darken('#C8232C', 0.4),
      },
    },
    twitter: {
      color: '#00ACEE',
      '&:hover': {
        color: darken('#00ACEE', 0.4),
      },
    },
    description: {
      textAlign: 'justify',
    },
    info: {
      textAlign: 'left',
    },
    name: {
      paddingBottom: 12,
    },
    [theme.breakpoints.down(425.5)]: {
      info: {
        textAlign: 'center',
      },
      name: {
        display: 'flex',
        textAlign: 'center',
      },
      rating: {
        display: 'flex',
        justifyContent: 'center',
      },
    },
  })
)
