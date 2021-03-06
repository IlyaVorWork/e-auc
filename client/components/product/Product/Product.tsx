import React, {
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { ICategoryProps, IProductProps } from '@interfaces/shop'
import Loader from '@ui/Loader'
import { Grid, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import { Rating } from '@material-ui/lab'

import { useStyles } from './Product.styles'
import { timer } from '@utils/shop'
import CREATE_BID from '@graphql/mutations/CreateBid'
import { ShopContext } from '@providers/ShopProvider'
import { useSnackbar } from 'notistack'
import { Button, IconButton, Input, Link } from '@ui/index'
import clsx from 'clsx'
import ProductCard from '@components/shop/components/ProductCard'
import { useMutation } from '@apollo/client'
import { AppContext } from '@providers/AppProvider'
import { makeBid, newPrice } from '@utils/account'
import UPDATE_PRICE from '@graphql/mutations/UpdatePrice'
import { useRouter } from 'next/router'

interface IProductComponent {
  product: IProductProps
}

const Product: FunctionComponent<IProductComponent> = ({ product }) => {
  const router = useRouter()
  const classes = useStyles()
  const { state, dispatch } = useContext(ShopContext)
  const { state: appState } = useContext(AppContext)
  const { isAuthenticated } = appState
  const { enqueueSnackbar } = useSnackbar()
  const theme = useTheme()

  const [createBid] = useMutation(CREATE_BID)
  const [updatePrice] = useMutation(UPDATE_PRICE)
  const isSmallWidth = useMediaQuery(theme.breakpoints.down('sm'))
  const [aboba, setAboba] = useState<number>(0)
  const [bidPrice, setBidPrice] = useState<number>(1)
  const [disable, setDisable] = useState<boolean>(false)
  const isMin = useMediaQuery(theme.breakpoints.between(425.5, 768.5))
  useEffect(() => setBidPrice(1), [product])

  const changeBidPrice = useCallback(
    (value: number) => {
      setBidPrice(value)
      console.log(bidPrice)
      return
    },
    [state.cart, dispatch, bidPrice, product]
  )
  if (!product) return <Loader />
  const {
    available,
    name,
    image,
    categories,
    price,
    rating,
    id,
    description,
    expire_date,
  }: IProductProps = product

  setInterval(() => {
    if (aboba == 0) {
      setAboba(1)
    } else {
      setAboba(0)
    }
  }, 1000)

  const data = timer(expire_date)

  const last = data.time < 0

  const bid = async () => {
    if (isAuthenticated) {
      if (bidPrice <= price) {
        enqueueSnackbar(
          '???????????? ???? ?????????? ???????? ???????????? ?????? ?????????? ?????????????? ???????? ????????????',
          { variant: 'warning' }
        )
      } else {
        if (bidPrice > 500000) {
          enqueueSnackbar('???????????? ???? ?????????? ?????????????????? 500000 ????????????', {
            variant: 'warning',
          })
        } else {
          setDisable(true)
          enqueueSnackbar(
            '????????????????????, ?????????????????? ???????????????? ????????????, ?????? ???????????? ??????????-???? ??????????.',
            { variant: 'info' }
          )
          await makeBid(createBid, appState.user, bidPrice, id)
          await newPrice(updatePrice, bidPrice, id)
          enqueueSnackbar('???????????? ??????????????, ?????????????? ???? ????????????????!', {
            variant: 'success',
          })
          router.push('/my-account?id=1')
        }
      }
    } else {
      enqueueSnackbar('???? ???? ????????????????????????', { variant: 'error' })
    }
  }

  const related4 = state.products
    .filter((x) => {
      if (
        x.categories.some(
          (c) => categories.map((a) => a.name).indexOf(c.name) > -1
        ) &&
        x.id !== id
      ) {
        return x
      }
    })
    .slice(0, 4)

  const related3 = state.products
    .filter((x) => {
      if (
        x.categories.some(
          (c) => categories.map((a) => a.name).indexOf(c.name) > -1
        ) &&
        x.id !== id
      ) {
        return x
      }
    })
    .slice(0, 3)

  return (
    <Grid
      container
      direction={isSmallWidth ? 'column' : 'row'}
      alignItems={isSmallWidth ? 'center' : 'flex-start'}
      justify={'space-between'}
      spacing={3}
      style={{ marginBottom: '3rem' }}
    >
      <Grid item xs={12} lg={12}>
        <Grid container spacing={1} direction={isSmallWidth ? 'column' : 'row'}>
          <Grid
            item
            xs={isSmallWidth ? 12 : 6}
            className={classes.imageContainer}
          >
            <img src={image.url} alt={name} className={classes.image} />
          </Grid>
          <Grid item xs={isSmallWidth ? 12 : 6} className={classes.infoContainer}>
            <Grid container direction={'column'} spacing={3}>
              <Grid item>
                <Typography variant={'caption'} className={classes.name}>
                  {name}
                </Typography>
                <Rating
                  name="read-only"
                  value={rating}
                  readOnly
                  precision={0.5}
                  className={clsx(classes.rating, classes.rating)}
                />
              </Grid>
              <Grid item>
                <Typography variant={'h1'} className={classes.info}>
                  {last
                    ? '00:00:00:00'
                    : data.days +
                      ':' +
                      data.hours +
                      ':' +
                      data.mins +
                      ':' +
                      data.sec}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant={'h1'} className={classes.info}>
                  {price + ' ???'}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant={'body2'} className={classes.description}>
                  {description}
                </Typography>
              </Grid>
              <Grid item>
                <Grid container justify={'space-between'} alignItems={'center'}>
                  <Grid item>
                    <Button
                      className={classes.buyButton}
                      onClick={bid}
                      disabled={last || disable}
                    >
                      {last ? `?????????? ??????????????????` : `?????????????? ????????????`}
                    </Button>
                  </Grid>
                  {available > 0 ? (
                    <Grid item>
                      <Grid container alignItems={'center'}>
                        <Input
                          type={'text'}
                          id={id + '_count'}
                          label={'???????? ????????????'}
                          value={bidPrice}
                          onChange={(e) => {
                            changeBidPrice(+e.currentTarget.value)
                          }}
                          className={classes.countInput}
                        />
                      </Grid>
                    </Grid>
                  ) : null}
                </Grid>
              </Grid>
              <Grid item>
                <Grid container justify={'space-between'} alignItems={'center'}>
                  <Grid item>
                    <Typography variant={'body2'}>
                      <b>??????????????????:</b>{' '}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant={'body2'}>
                      {categories
                        ? categories.map(
                            (category: ICategoryProps, index: number) => (
                              <span key={index}>
                                {category.name}
                                {index !== categories.length - 1 && ', '}
                              </span>
                            )
                          )
                        : null}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container justify={'space-between'} alignItems={'center'}>
                  <Grid item>
                    <Typography variant={'body2'}>
                      <b>????????????????????:</b>{' '}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Grid container alignItems={'center'} spacing={1}>
                      <Grid item>
                        <Link
                          target={'_blank'}
                          href={`https://www.facebook.com/sharer/sharer.php?display=popup&u=https://shop-products.vercel.app/products/${id}`}
                          className={classes.share}
                        >
                          <IconButton
                            icon={'facebook'}
                            className={clsx(classes.button, classes.facebook)}
                          />
                        </Link>
                      </Grid>
                      <Grid item>
                        <Link
                          target={'_blank'}
                          href={`https://pinterest.com/pin/create/button/?url=https://shop-products.vercel.app/products/${id}&media=${image.url}&description=${name}`}
                          className={classes.share}
                        >
                          <IconButton
                            icon={'pinterest'}
                            className={clsx(classes.button, classes.pinterest)}
                          />
                        </Link>
                      </Grid>
                      <Grid item>
                        <Link
                          target={'_blank'}
                          href={`https://twitter.com/intent/tweet?text=??????????????????+${name}+????+Food+Market+ &url=https://shop-products.vercel.app/products/${id}`}
                          className={classes.share}
                        >
                          <IconButton
                            icon={'twitter'}
                            className={clsx(classes.button, classes.twitter)}
                          />
                        </Link>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ marginBottom: '3rem' }}>
            <Grid container direction={'column'} spacing={3}>
              <Grid item style={{ padding: '20px 40px' }}>
                <Typography variant={'h1'} className={classes.info}>
                  ?????????????????? ????????????????
                </Typography>
              </Grid>
              <Grid item style={{ padding: '0 0 20px 0' }}>
                {isMin ? (
                  <Grid
                    container
                    justify={'space-around'}
                    alignItems={'center'}
                    spacing={3}
                  >
                    {related3.map((p) => (
                      <Grid item key={`product_${p.id}`}>
                        <ProductCard hit={p} />
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Grid
                    container
                    justify={'space-around'}
                    alignItems={'center'}
                    spacing={3}
                  >
                    {related4.map((p) => (
                      <Grid item key={`product_${p.id}`}>
                        <ProductCard hit={p} />
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Product
