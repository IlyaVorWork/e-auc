import React, { FunctionComponent, useContext, useState } from 'react'
import { Paper, Typography, Grid, Tooltip } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import { useSnackbar } from 'notistack'

import { IconButton, Link, Button } from '@ui/index'
import {
  IProductProps,
  ICategoryProps,
  IProductCardProps,
} from '@interfaces/shop'
import { buy, inWishlist, toggleWishlist } from '@utils/shop'
import { ShopContext } from '@providers/ShopProvider'

import { useStyles } from './ProductCard.styles'
import clsx from 'clsx'

const ProductCard: FunctionComponent<IProductCardProps> = ({ hit }: any) => {
  const {
    name,
    image,
    categories,
    price,
    rating,
    id,
    available,
    expire_date,
  }: IProductProps = hit

  const expireDate = new Date(expire_date).getTime()

  const [time, setTime] = useState<number>(0)

  const timer = setInterval(() => setTime(expireDate - Date.now()), 1000)

  const days = (time / 1000 / 60 / 60 / 24).toFixed(0)
  const hours = ((time / 1000 / 60 / 60) % 24).toFixed(0)
  const mins = ((time / 1000 / 60) % 60).toFixed(0)
  const sec = ((time / 1000) % 60).toFixed(0)

  const last = time <= 0

  const imgUrl = image.formats.thumbnail.url
  const productLink = `/products/${id}`

  const classes = useStyles()

  const { state, dispatch } = useContext(ShopContext)

  const { enqueueSnackbar } = useSnackbar()

  const toggleWish = async () =>
    await toggleWishlist(dispatch, id, state.wishlist)

  const inList = inWishlist(state.wishlist, id)
  // const inCart = inWishlist(state.cart, id)

  // const rfc = async () => {
  //   try {
  //     const data = await removeFromCart(dispatch, id, state.cart)
  //     if (data) return
  //     else enqueueSnackbar('Возникла ошибка', { variant: 'error' })
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const toCart = async () =>
    await buy(dispatch, id, state.cart, available, enqueueSnackbar)

  return (
    <Paper className={classes.root} square={true} aria-disabled={available < 1}>
      <Grid
        container
        direction={'column'}
        spacing={1}
        className={classes.slideContainer}
      >
        <Grid item>
          <Tooltip
            title={inList ? 'Удалить из избранного' : 'Добавить в избранное'}
            placement={'left'}
          >
            <IconButton
              icon={inList ? 'favoriteFill' : 'favorite'}
              color={inList ? 'secondary' : 'default'}
              className={classes.icon}
              onClick={toggleWish}
            />
          </Tooltip>
        </Grid>
        <Grid item className={classes.iconAnimation}>
          <Tooltip title={'Подробнее'} placement={'left'}>
            <Link href={productLink} style={{ border: 'none' }}>
              <IconButton icon={'search'} className={classes.icon} />
            </Link>
          </Tooltip>
        </Grid>
      </Grid>
      <Grid
        container
        direction={'column'}
        justify={'space-between'}
        spacing={2}
      >
        <Grid item xs={12} className={classes.imageContainer}>
          <img src={imgUrl} alt={name} className={classes.image} />
        </Grid>
        <Grid item>
          {last
            ? 'Торги завершены'
            : days + ':' + hours + ':' + mins + ':' + sec}
        </Grid>
        <Grid item>
          <Grid container direction={'column'} spacing={2}>
            <Grid item>
              <Grid
                container
                justify={'flex-start'}
                alignItems={'center'}
                spacing={1}
              >
                {categories.map((category: ICategoryProps, index: number) => (
                  <Grid item key={index}>
                    <Typography variant={'body1'}>
                      {category.name}
                      {index !== categories.length - 1 && ','}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item>
              <Link href={productLink} className={classes.name}>
                <Typography variant={'h4'}>{name}</Typography>
              </Link>
            </Grid>
            <Grid item>
              <Grid
                container
                justify={'space-between'}
                alignItems={'center'}
                className={classes.actions}
              >
                <Grid item>
                  <Typography variant={'h4'}>{price + ' ₽'}</Typography>
                </Grid>
                <Grid item>
                  <Rating
                    name="read-only"
                    value={rating}
                    readOnly
                    precision={0.5}
                    className={classes.rating}
                  />
                  {last ? (
                    <Button
                      disabled={true}
                      variant={'text'}
                      className={classes.cartButton}
                    >
                      Торги закрыты
                    </Button>
                  ) : (
                    <Button
                      // icon={inCart ? 'cartRemove' : 'cart'}
                      // color={inCart ? 'secondary' : 'primary'}
                      variant={'text'}
                      className={clsx(
                        classes.cartButton,
                        classes.primaryButton
                      )}
                      // onClick={inCart ? rfc : toCart}
                      color={'primary'}
                      icon={'cart'}
                      onClick={toCart}
                      // inCart ? 'Из корзины' : 'В корзину'
                    >
                      Сделать ставку
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default React.memo(ProductCard)
