import React, { FunctionComponent, useContext, useState } from 'react'
import {
  Paper,
  Typography,
  Grid,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'
import { useStyles } from './Bid.styles'
import { IBidProps } from '@interfaces/shop'
import { makeDate, updateBidStatus } from '@utils/account'
import Loader from '@ui/Loader'
import clsx from 'clsx'
import { useMutation, useQuery } from '@apollo/client'
import PRODUCT_BIDS from '@graphql/queries/ProductBids'
import UPDATE_BID from '@graphql/mutations/UpdateBid'
import { Button, Link } from '@ui/index'
import { useSnackbar } from 'notistack'
import { ShopContext } from '@providers/ShopProvider'
import { buy, timer, updateCount } from '@utils/shop'
import { useRouter } from 'next/router'

interface IBidComponentProps {
  bid: IBidProps
}

const Bid: FunctionComponent<IBidComponentProps> = ({ bid }) => {
  const theme = useTheme()
  const router = useRouter()
  const { state, dispatch } = useContext(ShopContext)
  const [updateBid] = useMutation(UPDATE_BID)
  const [aboba, setAboba] = useState<number>(0)
  const { enqueueSnackbar } = useSnackbar()
  const { id, price, product, createdAt } = bid
  const date = makeDate(createdAt)
  const isMobile = useMediaQuery(theme.breakpoints.down(425.5))
  const classes = useStyles()
  const { data, loading } = useQuery(PRODUCT_BIDS, {
    variables: {
      id: product.id,
    },
  })

  if (loading) return <Loader />

  const productLink = `/products/${product.id}`

  const winBid = data.product.bids[data.product.bids.length - 1].price
  const win = winBid == price
  const active = new Date(product.expire_date).getTime() - Date.now() > 0
  let status
  if (active) {
    if (win) {
      status = (
        <Typography
          variant={'h5'}
          className={clsx(classes.activeBid, classes.bidStatus)}
        >
          Активная
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
    await router.push('/my-account?panel=2')
    await router.reload()
  }

  setInterval(() => {
    if (aboba == 0) {
      setAboba(1)
    } else {
      setAboba(0)
    }
  }, 1000)

  const timerData = timer(product.expire_date)

  const last = timerData.time < 0

  return (
    <Paper className={classes.root} square={true}>
      {isMobile ? (
        <Grid container direction={'column'} alignItems={'center'} spacing={2}>
          <Grid
            item
            container
            direction={'column'}
            alignItems={'center'}
            style={{ width: '80%' }}
          >
            <Grid
              item
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <img
                src={product.image.url}
                alt={product.name}
                className={classes.image}
              />
            </Grid>
            <Grid
              item
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '80%',
              }}
            >
              <Link href={productLink} className={classes.name}>
                <Typography variant={'h5'} style={{ textAlign: 'center' }}>
                  {product.name}
                </Typography>
              </Link>
            </Grid>
          </Grid>
          <Grid item style={{ width: '100%' }}>
            <Grid container justify={'space-between'} alignItems={'center'}>
              <Grid item className={classes.title}>
                <Typography variant={'h4'}>Цена</Typography>
              </Grid>
              <Grid item>
                <Typography variant={'h5'}>{`${price} ₽`}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item style={{ width: '100%' }}>
            <Grid container justify={'space-between'} alignItems={'center'}>
              <Grid item className={classes.title}>
                <Typography variant={'h4'}>До конца аукциона</Typography>
              </Grid>
              <Grid item>
                <Typography variant={'h5'}>
                  {last
                    ? '0:00:00:00'
                    : timerData.days +
                      ':' +
                      timerData.hours +
                      ':' +
                      timerData.mins +
                      ':' +
                      timerData.sec}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item style={{ width: '100%' }}>
            <Grid container justify={'space-between'} alignItems={'center'}>
              <Grid item className={classes.title}>
                <Typography variant={'h4'}>Дата (UTC)</Typography>
              </Grid>
              <Grid item>
                <Typography variant={'h5'}>{date}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item style={{ width: '100%' }}>
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
                >
                  В корзину
                </Button>
              </Grid>
            </Grid>
          ) : null}
        </Grid>
      ) : (
        <Grid container direction={'column'} spacing={2}>
          <Grid item>
            <Grid container justify={'space-between'} alignItems={'center'}>
              <Grid item className={classes.title}>
                <Typography variant={'h4'}>Продукт</Typography>
              </Grid>
              <Grid item>
                <Link href={productLink} className={classes.name}>
                  <Typography variant={'h5'} style={{ textAlign: 'center' }}>
                    {product.name}
                  </Typography>
                </Link>
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
                <Typography variant={'h4'}>Аукцион закончится через</Typography>
              </Grid>
              <Grid item>
                <Typography variant={'h5'}>
                  {last
                    ? '0:00:00:00'
                    : timerData.days +
                      ':' +
                      timerData.hours +
                      ':' +
                      timerData.mins +
                      ':' +
                      timerData.sec}
                </Typography>
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
                >
                  В корзину
                </Button>
              </Grid>
            </Grid>
          ) : null}
        </Grid>
      )}
    </Paper>
  )
}

export default Bid
