import React, { FunctionComponent, useContext } from 'react'
import { Grid, Tooltip, Typography } from '@material-ui/core'
import { IconButton, Link } from '@ui/index'
import Bid from '@components/account/MyAccount/Bids/Bid'
import { useStyles } from '@components/account/MyAccount/Bids/Bids.styles'
import { AppContext } from '@providers/AppProvider'

const Bids: FunctionComponent = () => {
  const { state } = useContext(AppContext)
  console.log(state)
  const classes = useStyles()
  // const theme = useTheme()
  // const isSmallWidth = useMediaQuery(theme.breakpoints.down('sm'))
  return (
    <Grid container direction={'column'} spacing={2} alignItems={'center'}>
      <Grid item xs={12}>
        <Grid container spacing={2} alignItems={'center'}>
          <Grid item>
            <Typography variant={'h1'}>Ставки</Typography>
          </Grid>
          {state.user?.bids?.length ? (
            <Grid item>
              <Tooltip title={'Очистить историю ставок'} placement={'top'}>
                <IconButton
                  icon={'clear'}
                  className={classes.icon}
                  // onClick={clearOrders}
                />
              </Tooltip>
            </Grid>
          ) : null}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2} direction={'column'} alignItems={'center'}>
          {state.user?.bids?.length ? (
            state.user.bids.map((o) => (
              <Grid item key={o.id}>
                <Bid bid={o} />
              </Grid>
            ))
          ) : (
            <Grid item>
              <Typography variant={'body1'} paragraph>
                У вас пока нет ставок. Вы можете сделать ставку на любой
                доступный товар. Для этого воспользуйтесь{' '}
                <Link href={'/shop'}>Магазином</Link>.
              </Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Bids
