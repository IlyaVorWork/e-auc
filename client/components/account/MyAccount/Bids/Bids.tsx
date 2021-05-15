import React, { FunctionComponent, useContext } from 'react'
import { Grid, Tooltip, Typography } from '@material-ui/core'
import { IconButton, Link } from '@ui/index'
import Bid from '@components/account/MyAccount/Bids/Bid'
import { useStyles } from '@components/account/MyAccount/Bids/Bids.styles'
import { AppContext } from '@providers/AppProvider'
import { timer } from '@utils/shop'
import { updUser } from '@utils/auth'
import { useMutation } from '@apollo/client'
import UPDATE_USER from '@graphql/mutations/UpdateUser'

const Bids: FunctionComponent = () => {
  const { state, dispatch } = useContext(AppContext)
  const [updateUser] = useMutation(UPDATE_USER)
  console.log(state)
  const classes = useStyles()
  // const theme = useTheme()
  // const isSmallWidth = useMediaQuery(theme.breakpoints.down('sm'))
  const lost: string[] = []
  state.user?.bids?.filter((x) => {
    if (
      (x.added != true &&
        timer(x.product.expire_date).time > 0 &&
        x.product.bids[x.product.bids.length - 1].price == x.price) ||
      (x.added != true &&
        x.product.bids[x.product.bids.length - 1].price == x.price)
    ) {
      lost.push(x.id)
    }
  })

  console.log(lost)

  const clearBids = async () => {
    await updUser(dispatch, updateUser, state?.user?.id, {
      bids: lost,
    })
    return
  }

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
                  onClick={clearBids}
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
