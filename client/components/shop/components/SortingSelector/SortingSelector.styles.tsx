import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

import { green } from '@material-ui/core/colors'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    select: {
      minWidth: 200,
      color: theme.palette.primary.contrastText,
      fontWeight: 300,
      paddingLeft: 24,
      paddingTop: 14,
      paddingBottom: 15,
      backgroundColor: theme.palette.background.paper,
      borderStyle: 'solid',
      borderWidth: 1,
      borderRadius: 0,
      borderColor: theme.palette.primary.contrastText,
      '&:focus': {
        backgroundColor: theme.palette.background.paper,
      },
    },
    menuItem: {
      borderRadius: 0,
    },
    icon: {
      color: theme.palette.primary.contrastText,
      right: 12,
      position: 'absolute',
      userSelect: 'none',
      pointerEvents: 'none',
    },
    paper: {
      borderRadius: 0,
      marginTop: 8,
    },
    list: {
      paddingTop: 0,
      paddingBottom: 0,
      backgroundColor: theme.palette.background.paper,
      '& li': {
        fontWeight: 300,
        paddingTop: 12,
        paddingBottom: 12,
      },
      '& li:hover': {
        backgroundColor: theme.palette.primary.light,
      },
      '& li.Mui-selected': {
        color: '#FAFAFA',
        backgroundColor: theme.palette.primary.dark,
      },
      '& li.Mui-selected:hover': {
        backgroundColor: theme.palette.primary.dark,
      },
    },
  })
)
