import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    slider: {},
    label: {
      color: theme.palette.background.paper,
      '& > span': {
        borderColor: theme.palette.primary.contrastText,
        borderStyle: 'solid',
        borderWidth: 1,
        width: '42px',
        height: '42px',
        position: 'relative',
        right: '5px',
        bottom: '8px',
      },
    },
  })
)
