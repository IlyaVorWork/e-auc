import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { indigo, yellow } from '@material-ui/core/colors'

export const useStyles = makeStyles((theme: Theme & { name: string }) =>
  createStyles({
    root: {
      position: 'relative',
      padding: '0 20px',
      flex: 1,
      minHeight: '100vh',
      overflow: 'hidden',
    },
    header: {
      padding: '0px 40px',
      marginBottom: '45px',
      minHeight: 90,
      fontWeight: 500,
      boxShadow: '0px 1px 5px',
      boxShadowColor: theme.palette.primary.contrastText,
    },
    logo: {
      width: '113px',
      height: '56px',
      fontWeight: 500,
      fontSize: '44px',
      lineHeight: '56px',
      '&:hover': {
        color: theme.palette.primary.contrastText,
      },
    },
    footerLogo: {
      fontSize: '.875rem',
    },
    link: {
      transition: '.3s ease-in-out',
      padding: '35px 30px',
      height: '90px',
      color: theme.palette.primary.contrastText,
      fontSize: '18px',
      lineHeight: '16px',
      align: 'center',
      fontWeight: 800,
      '&:hover': {
        color: theme.palette.secondary.contrastText,
      },
    },
    partLogo: {
      color: theme.palette.primary.light,
    },
    // style: {
    //   cursor: 'pointer',
    //   textDecoration: 'none',
    //   fontSize: '.875rem',
    //   borderBottom: '1px dashed #e0e0e0',
    // },
    themeSwitch: { marginRight: 'auto', marginLeft: 25 },
    themeIcon: {
      transition: '.2s ease-in-out',
      '& svg': {
        width: '2rem',
        height: '2rem',
      },
    },
    sun: {
      color: theme.palette.primary.contrastText,
      '&:hover': {
        backgroundColor: 'transparent',
        color: yellow[500],
      },
    },
    moon: {
      color: 'inherit',
      '&:hover': {
        backgroundColor: 'transparent',
        color: indigo[500],
      },
    },
    footer: {
      position: 'relative',
      color: '#fafafa',
      backgroundColor: '#212121',
    },
    copyright: {
      padding: '16px 0',
    },
    menuItem: {
      transition: '.3s ease-in-out',
      padding: '35px 0px',
      height: '90px',
      '&:hover': {
        backgroundColor: theme.palette.primary.light,
      },
    },
    hidden: {
      height: '0px',
      overflow: 'hidden',
    },
    [theme.breakpoints.down('sm')]: {
      themeSwitch: {
        margin: 0,
      },
      unhidden: {
        paddingBottom: '20px',
      },
      header: {
        marginBottom: 40,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      },
      topCont: {
        padding: '20px 0px',
        marginBottom: '0',
        marginTop: '0',
      },
      link: {
        borderBottom: '1px solid',
        borderColor: theme.palette.primary.contrastText,
        padding: '15px 30px',
        '&:hover': {
          color: theme.palette.primary.light,
        },
      },
      menuItem: {
        padding: '25px 0px',
        height: 'auto',
        color: theme.palette.primary.contrastText,
        '&:hover': {
          backgroundColor: 'transparent',
        },
      },
    },
    [theme.breakpoints.between('md', 'md')]: {
      link: {
        padding: '35px 12.6px',
      },
    },
  })
)
