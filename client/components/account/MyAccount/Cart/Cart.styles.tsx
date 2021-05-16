import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    placeOrderRoot: {
      padding: 20,
      minWidth: 200,
    },
    button: {
      color: theme.palette.primary.light,
    },
  })
)
