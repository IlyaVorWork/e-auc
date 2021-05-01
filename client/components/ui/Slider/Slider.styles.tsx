import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    slider: {},
    label: {
      color: theme.palette.background.paper,
      '& > span': {
        borderColor: 'rgba(0,0,0,0.14)',
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
