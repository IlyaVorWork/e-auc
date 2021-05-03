import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
// import { Grid } from '@material-ui/core'
// import React from 'react'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {
      overflow: 'hidden',
      marginBottom: '3rem',
    },
    poster: {
      display: 'flex',
      padding: '30px 0px 30px 0px',
      marginRight: '110px',
      '&:last-child': {
        marginRight: '0px',
      },
    },
    infoBanner: {
      width: '50px',
      height: '60px',
      marginRight: '20px',
    },
    infoTitle: {
      paddingTop: '15px',
    },
    wrapper: {
      display: 'flex',
      justifyContent: 'center',
    },
    cardBlock: {
      display: 'flex',
    },
    card: {
      textShadow: '1px 1px 1px' + theme.palette.primary.contrastText,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      width: '525px',
      flexDirection: 'column',
      alingItems: 'left',
    },
    halfCard: {},
    greenCard: {
      backgroundImage: `url('/images/main/banners/greenCard.jpg')`,
      height: '239px',
      '& h1': { width: '75%' },
    },
    yellowCard: {
      backgroundImage: `url('/images/main/banners/yellowCard.jpg')`,
      height: '335px',
    },
    redCard: {
      backgroundImage: `url('/images/main/banners/redCard.jpg')`,
      height: '335px',
    },
    blueCard: {
      backgroundImage: `url('/images/main/banners/blueCard.jpg')`,
      height: '239px',
      '& h1': { width: '35%' },
    },
    cardTitle: {
      width: '70%',
      fontWeight: 500,
      fontSize: '32px',
      lineHeight: '36px',
      color: '#ffffff',
      padding: '35px 0px 0px 35px',
    },
    // cardCount: {
    //   color: '#ffffff',
    //   fontSize: '16px',
    //   paddingLeft: '35px',
    // },
    button: {
      textShadow: 'none',
      position: 'absolute',
      // bottom: 52,
      width: '170px',
      textAlign: 'center',
      padding: '13px 30px',
      marginLeft: '35px',
      marginTop: '16px',
      color: theme.palette.secondary.contrastText,
      border: '1px solid',
      borderColor: theme.palette.secondary.contrastText,
      boxSizing: 'border-box',
      borderRadius: '30px',
      fontWeight: 500,
      fontSize: '14px',
      lineHeight: '16px',
      '&:hover': {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.secondary.contrastText,
      },
    },
    banner: {
      width: '100%',
      minHeight: 158,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      paddingLeft: 30,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      '&:nth-child(1)': {
        backgroundImage: `url('/images/main/banners/3.jpeg')`,
      },
      '&:nth-child(2)': {
        backgroundImage: `url('/images/main/banners/4.jpeg')`,
      },
      '&:nth-child(3)': {
        backgroundImage: `url('/images/main/banners/5.jpeg')`,
      },
      '& h1': {
        color: 'white',
        fontSize: 30,
        marginBottom: '.2rem',
      },
      '& a': {
        color: 'rgb(255, 211, 77)',
        border: 'none',
        fontWeight: 500,
      },
    },
    review: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      padding: '40px 32px',
    },
    contents: {
      width: 'calc(100% - 100px)',
    },
    [theme.breakpoints.down('sm')]: {
      poster: {
        margin: 0,
      },
      mainContainer: {
        marginTop: '40px',
      },
      card: {
        marginBottom: '5px',
        backgroundSize: 'contain',
        width: '100%',
      },
      cardBlock: {
        width: '100%',
      },
      button: {},
      greenCard: {
        height: '155px',
        '& h1': {
          width: '80%',
        },
      },
      yellowCard: {
        height: '217px',
        '& h1': {
          width: '50%',
        },
      },
      redCard: {
        height: '217px',
      },
      blueCard: {
        height: '155px',
      },
      cardTitle: {
        width: '70%',
        fontWeight: 500,
        fontSize: '22px',
        lineHeight: '30px',
        color: '#ffffff',
        padding: '10px 0px 0px 14px',
      },
    },
    [theme.breakpoints.between('md', 'md')]: {
      poster: {
        marginRight: '70px',
        '&:last-child': {
          marginRight: '0px',
        },
      },
      halfCard: {
        paddingLeft: 25,
        '&:last-child': {
          paddingLeft: '0px',
        },
      },
    },
    [theme.breakpoints.between(0, 375)]: {
      poster: {
        '&:nth-child(2)': {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          '& h1': {
            width: '50%',
            textAlign: 'center',
            paddingTop: 0,
          },
        },
      },
      card: {
        margin: '0 0 5px 0',
      },
      greenCard: {
        height: '135px',
        '& h1': {
          width: '90%',
        },
      },
      yellowCard: {
        height: '189px',
        '& h1': {
          width: '60%',
        },
      },
      redCard: {
        height: '189px',
        '& h1': {
          width: '80%',
        },
      },
      blueCard: {
        height: '135px',
        '& h1': {
          width: '55%',
        },
      },
    },
    [theme.breakpoints.between(0, 425.5)]: {
      cardLink: {
        width: '90%',
      },
    },
    [theme.breakpoints.between(375.5, 425.5)]: {
      greenCard: {
        height: '177px',
        '& h1': {
          width: '70%',
        },
      },
      yellowCard: {
        height: '248px',
        '& h1': {
          width: '60%',
        },
      },
      redCard: {
        height: '248px',
        '& h1': {
          width: '60%',
        },
      },
      blueCard: {
        height: '177px',
        '& h1': {
          width: '55%',
        },
      },
    },
    [theme.breakpoints.between(426, 768.5)]: {
      cardLink: {
        width: '43%',
      },
      greenCard: {
        height: '152px',
        '& h1': {
          width: '80%',
        },
      },
      yellowCard: {
        height: '213px',
        '& h1': {
          width: '60%',
        },
      },
      redCard: {
        height: '213px',
        '& h1': {
          width: '80%',
        },
      },
      blueCard: {
        height: '152px',
        '& h1': {
          width: '55%',
        },
      },
    },
    [theme.breakpoints.up('md')]: {
      card: { margin: '4px 2px' },
    },
    [theme.breakpoints.up('xl')]: {
      carouselContainer: {
        marginLeft: '25%',
      },
    },
  })
)
