import { createStyles, makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() =>
  createStyles({
    button: {
      // bottom: 52,
      padding: '13px 30px',
      border: '1px solid',
      boxSizing: 'border-box',
      borderRadius: '30px',
      fontWeight: 600,
      backgroundColor: 'transparent',
      fontSize: '16px',
      boxShadow: 'none',
    },
  })
)
