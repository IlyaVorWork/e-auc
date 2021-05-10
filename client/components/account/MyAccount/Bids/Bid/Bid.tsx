import React, { FunctionComponent, useContext } from 'react'
import { Paper, Typography, Grid } from '@material-ui/core'

import { useStyles } from './Bid.styles'
import { IBidProps } from '@interfaces/shop'
import { makeDate, updateBidStatus } from '@utils/account'
import Loader from '@ui/Loader'
import clsx from 'clsx'
import { useMutation, useQuery } from '@apollo/client'
import PRODUCT_BIDS from '@graphql/queries/ProductBids'
import UPDATE_BID from '@graphql/mutations/UpdateBid'
import { Button } from '@ui/index'
import { useSnackbar } from 'notistack'
import { ShopContext } from '@providers/ShopProvider'
import { buy, updateCount } from '@utils/shop'

interface IBidComponentProps {
  bid: IBidProps
}

const Bid: FunctionComponent<IBidComponentProps> = ({ bid }) => {
  const { state, dispatch } = useContext(ShopContext)
  const [updateBid] = useMutation(UPDATE_BID)
  const { enqueueSnackbar } = useSnackbar()
  const { id, price, product, createdAt } = bid
  const date = makeDate(createdAt)
  const classes = useStyles()
  const { data, loading } = useQuery(PRODUCT_BIDS, {
    variables: {
      id: product.id,
    },
  })

  if (loading) return <Loader />

  console.log(data)
  console.log(state)
  const winBid = data.product.bids[data.product.bids.length - 1].price
  const win = winBid == price
  const active = new Date(product.expire_date).getTime() - Date.now() > 0
  let status
  if (active) {
    status = (
      <Typography
        variant={'h5'}
        className={clsx(classes.activeBid, classes.bidStatus)}
      >
        Активная
      </Typography>
    )
  } else {
    if (win) {
      status = (
        <Typography
          variant={'h5'}
          className={clsx(classes.winBid, classes.bidStatus)}
        >
          Выиграна
        </Typography>
      )
    } else {
      status = (
        <Typography
          variant={'h5'}
          className={clsx(classes.lossBid, classes.bidStatus)}
        >
          Проиграна
        </Typography>
      )
    }
  }

  const toCart = async () => {
    await buy(
      dispatch,
      data.product.id,
      state.cart,
      data.product.available,
      enqueueSnackbar
    )
    await updateCount(dispatch, state.cart, id, 1)
    await updateBidStatus(updateBid, id)
    location.reload()
  }

  return (
    <Paper className={classes.root} square={true}>
      <Grid container direction={'column'} spacing={2}>
        <Grid item>
          <Grid container justify={'space-between'} alignItems={'center'}>
            <Grid item className={classes.title}>
              <Typography variant={'h4'}>Продукт</Typography>
            </Grid>
            <Grid item>
              <Typography variant={'h5'}>{product.name}</Typography>
            </Grid>
            <Grid item>
              <img
                src={product.image.url}
                alt={product.name}
                className={classes.image}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container justify={'space-between'} alignItems={'center'}>
            <Grid item className={classes.title}>
              <Typography variant={'h4'}>Цена</Typography>
            </Grid>
            <Grid item>
              <Typography variant={'h5'}>{`${price} ₽`}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container justify={'space-between'} alignItems={'center'}>
            <Grid item className={classes.title}>
              <Typography variant={'h4'}>Дата (UTC)</Typography>
            </Grid>
            <Grid item>
              <Typography variant={'h5'}>{date}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container justify={'space-between'} alignItems={'center'}>
            <Grid item className={classes.title}>
              <Typography variant={'h4'}>ID</Typography>
            </Grid>
            <Grid item>
              <Typography variant={'h5'}>{id}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container justify={'space-between'} alignItems={'center'}>
            <Grid item className={classes.title}>
              <Typography variant={'h4'}>Статус</Typography>
            </Grid>
            <Grid item>{status}</Grid>
          </Grid>
        </Grid>
        {win &&
        !data.product.bids[data.product.bids.length - 1].added &&
        !active ? (
          <Grid item>
            <Grid container justify={'space-between'} alignItems={'center'}>
              <Button
                color={'primary'}
                className={classes.buyButton}
                onClick={toCart}
                size={'large'}
              >
                В корзину
              </Button>
            </Grid>
          </Grid>
        ) : null}
      </Grid>
    </Paper>
  )
}

export default Bid
