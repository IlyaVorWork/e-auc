import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      overflow: 'hidden',
      position: 'relative',
      top: 0,
      margin: 0,
      width: '100%',
      height: 'auto',
      backgroundColor: '#313131',
      // minHeight: 164,
    },
    heading: {
      color: '#fafafa',
    },
    [theme.breakpoints.down('xs')]: {
      form: {},
      subscribeButton: {
        width: 'auto',
      },
    },
    form: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    subscribeInput: {
      height: 48,
      width: 200,
      color: '#ffffff !important',
      border: 'none !important',
      outline: 'none !important',
      backgroundColor: 'transparent',
      '& div': {
        borderRadius: '30px 0px 0px 30px',
        color: '#ffffff !important',
        height: 48,
        margin: 0,
      },
      '& label': {
        color: 'white !important',
      },
      '& fieldset': {
        borderColor: 'white !important',
        color: '#ffffff !important',
      },
    },
    subscribeButton: {
      borderRadius: '0px 30px 30px 0px',
      padding: '14px 28px',
      height: 48,
      transition: '.2s ease-in-out',
      color: '#ffffff',
      backgroundColor: 'transparent',
      '&:hover': {
        backgroundColor: theme.palette.primary.light,
      },
    },
    app: {
      cursor: 'pointer',
    },
    link: {
      border: 'none',
      '& svg': {
        color: '#ffffff',
        transition: '.2s ease-in-out',
        '&:hover': {
          color: '#fafafa',
        },
      },
    },
    [theme.breakpoints.down('sm')]: {
      subscribeButton: {
        marginTop: '0px !important',
        borderRadius: '0 0 20px 20px',
      },
      subscribeInput: {
        '& div': {
          borderRadius: '20px 20px 0 0',
        },
      },
    },
    [theme.breakpoints.between('sm', 'md')]: {
      subscribeButton: {
        width: '200px',
        borderRadius: '0 30px 30px 0',
      },
      subscribeInput: {
        width: '200px',
        '& div': {
          borderRadius: '30px 0 0 30px',
        },
      },
    },
  })
)
