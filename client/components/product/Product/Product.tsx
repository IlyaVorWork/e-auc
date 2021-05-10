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
// import { buy, countOfItem, updateCount } from '@utils/shop'
import CREATE_BID from '@graphql/mutations/CreateBid'
import { ShopContext } from '@providers/ShopProvider'
import { useSnackbar } from 'notistack'
import { Button, IconButton, Input, Link } from '@ui/index'
import CartMini from '@components/shop/components/CartMini'
import clsx from 'clsx'
import ProductCard from '@components/shop/components/ProductCard'
import { useMutation } from '@apollo/client'
import { AppContext } from '@providers/AppProvider'
import { makeBid, newPrice } from '@utils/account'
import UPDATE_PRICE from '@graphql/mutations/UpdatePrice'

interface IProductComponent {
  product: IProductProps
}

const Product: FunctionComponent<IProductComponent> = ({ product }) => {
  const classes = useStyles()
  const { state, dispatch } = useContext(ShopContext)
  const { state: appState, dispatch: appDispatch } = useContext(AppContext)
  const { enqueueSnackbar } = useSnackbar()
  const theme = useTheme()

  const [createBid] = useMutation(CREATE_BID)
  const [updatePrice] = useMutation(UPDATE_PRICE)
  const isSmallWidth = useMediaQuery(theme.breakpoints.down('sm'))
  const [time, setTime] = useState<number>(1)
  const [bidPrice, setBidPrice] = useState<number>(1)
  const [disable, setDisable] = useState<boolean>(false)
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

  const expireDate = new Date(expire_date).getTime()

  if (time > 1000) {
    setInterval(() => setTime(expireDate - Date.now()), 1000)
  } else {
    setInterval(() => setTime(expireDate - Date.now()), 1)
  }

  const days = Math.floor(time / 1000 / 60 / 60 / 24)
  let hours = Math.floor((time / 1000 / 60 / 60) % 24).toString()
  let mins = Math.floor((time / 1000 / 60) % 60).toString()
  let sec = Math.floor((time / 1000) % 60).toString()
  if (hours.toString().length === 1) {
    hours = '0' + hours
  }
  if (mins.toString().length === 1) {
    mins = '0' + mins
  }
  if (sec.toString().length === 1) {
    sec = '0' + sec
  }
  const last = time < 0
  // const toCart = async () => {
  //   await buy(dispatch, id, state.cart, available, enqueueSnackbar)
  //   if (itemCount > 1) {
  //     const currentCount = countOfItem(id, state.cart)
  //     if (currentCount !== available) {
  //       await updateCount(
  //         dispatch,
  //         state.cart,
  //         id,
  //         currentCount + itemCount - 1
  //       )
  //     }
  //   }
  // }

  const bid = async () => {
    if (bidPrice <= price) {
      enqueueSnackbar(
        'Ставка не может быть меньше или равна текущей цене товара',
        { variant: 'warning' }
      )
    } else {
      if (bidPrice > 500000) {
        enqueueSnackbar('Ставка не может превышать 500000 рублей', {
          variant: 'warning',
        })
      } else {
        setDisable(true)
        enqueueSnackbar(
          'Пожалуйста, дождитесь принятия ставки, это займёт какое-то время.',
          { variant: 'info' }
        )
        await makeBid(appDispatch, createBid, appState.user, bidPrice, id)
        await newPrice(updatePrice, bidPrice, id)
        enqueueSnackbar('Ставка принята, спасибо за ожидание!', {
          variant: 'success',
        })
        location.reload()
      }
    }
  }

  const related = state.products
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

  return (
    <Grid
      container
      direction={isSmallWidth ? 'column' : 'row'}
      alignItems={isSmallWidth ? 'center' : 'flex-start'}
      justify={'space-between'}
      spacing={3}
      style={{ marginBottom: '3rem' }}
    >
      <Grid item xs={12} lg={9}>
        <Grid container spacing={1} direction={isSmallWidth ? 'column' : 'row'}>
          <Grid
            item
            xs={isSmallWidth ? 12 : 6}
            className={classes.imageContainer}
          >
            <img src={image.url} alt={name} className={classes.image} />
          </Grid>
          <Grid item xs={isSmallWidth ? 12 : 6}>
            <Grid container direction={'column'} spacing={3}>
              <Grid item>
                <Typography variant={'caption'}>{name}</Typography>
                <Rating
                  name="read-only"
                  value={rating}
                  readOnly
                  precision={0.5}
                  className={classes.rating}
                />
              </Grid>
              <Grid item>
                <Typography variant={'h1'}>
                  {last
                    ? '00:00:00:00'
                    : days + ':' + hours + ':' + mins + ':' + sec}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant={'h1'}>{price + ' ₽'}</Typography>
              </Grid>
              <Grid item>
                <Typography variant={'body2'}>{description}</Typography>
              </Grid>
              <Grid item>
                <Grid container justify={'space-between'} alignItems={'center'}>
                  <Grid item>
                    <Button
                      color={'primary'}
                      className={classes.buyButton}
                      onClick={bid}
                      size={'large'}
                      variant={last ? 'contained' : 'text'}
                      disabled={last || disable}
                    >
                      {last ? `Торги завершены` : `Сделать ставку`}
                    </Button>
                  </Grid>
                  {available > 0 ? (
                    <Grid item>
                      <Grid container alignItems={'center'}>
                        <Input
                          type={'text'}
                          id={id + '_count'}
                          label={'Цена ставки'}
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
                      <b>Категории:</b>{' '}
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
                      <b>Поделиться:</b>{' '}
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
                          href={`https://twitter.com/intent/tweet?text=Покупайте+${name}+на+Food+Market+ &url=https://shop-products.vercel.app/products/${id}`}
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
                <Typography variant={'h1'}>Связанные продукты</Typography>
              </Grid>
              <Grid item style={{ padding: '0 0 20px 0' }}>
                <Grid
                  container
                  justify={'space-around'}
                  alignItems={'center'}
                  spacing={3}
                >
                  {related.map((p) => (
                    <Grid item key={`product_${p.id}`}>
                      <ProductCard hit={p} />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} lg={3}>
        <Grid
          container
          className={classes.side}
          direction={'column'}
          spacing={3}
        >
          <Grid item>
            <CartMini />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Product
