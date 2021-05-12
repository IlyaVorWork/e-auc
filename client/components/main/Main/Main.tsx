import React, { FunctionComponent, useContext } from 'react'
import {
  Grid,
  Hidden,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'
import Carousel from '@components/main/Carousel'
import { useStyles } from './Main.styles'
import ProductCard from '@components/shop/components/ProductCard/ProductCard'
import { ShopContext } from '@providers/ShopProvider'
import clsx from 'clsx'
import { Button, Link } from '@ui/index'

const Main: FunctionComponent = () => {
  const classes = useStyles()
  const { state } = useContext(ShopContext)

  const popular5 = state.products
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5)
  const popular3 = state.products
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3)

  const theme = useTheme()
  const isSmallWidth = useMediaQuery(theme.breakpoints.down('sm'))
  const xsWidth = useMediaQuery(theme.breakpoints.down('xs'))
  const mdWidth = useMediaQuery(theme.breakpoints.down('md'))
  const isLarge = useMediaQuery(theme.breakpoints.up('xl'))

  return (
    <div className={classes.mainContainer}>
      <Grid container direction={'column'} spacing={6}>
        <Hidden xsDown>
          <Grid
            item
            sm={isLarge ? 6 : 12}
            className={classes.carouselContainer}
          >
            <Carousel />
          </Grid>
        </Hidden>
        <Grid
          container
          direction={isSmallWidth ? 'column' : 'row'}
          justify={'center'}
          alignItems={'center'}
          className={classes.wrapper}
        >
          <Grid item className={classes.poster}>
            <img
              src="/images/main/banners/supportIcon.png"
              className={classes.infoBanner}
            />
            <Typography variant={'h1'} className={classes.infoTitle}>
              Обратная связь
            </Typography>
          </Grid>
          <Grid item className={classes.poster}>
            <img
              src="/images/main/banners/deliveriesIcons.png"
              className={classes.infoBanner}
            />
            <Typography variant={'h1'} className={classes.infoTitle}>
              Бесплатная доставка
            </Typography>
          </Grid>
          <Grid item className={classes.poster}>
            <img
              src="/images/main/banners/creditIcon.png"
              className={classes.infoBanner}
            />
            <Typography variant={'h1'} className={classes.infoTitle}>
              Оплата по карте
            </Typography>
          </Grid>
        </Grid>
        {isSmallWidth ? (
          <Grid className={classes.wrapper}>
            <Grid
              className={classes.cardBlock}
              direction={isSmallWidth ? 'column' : 'row'}
              alignItems={'center'}
            >
              <Link href={'/shop'} className={classes.cardLink}>
                <Grid className={clsx(classes.card, classes.greenCard)}>
                  <Typography
                    variant={'h1'}
                    align={'left'}
                    className={classes.cardTitle}
                  >
                    Мобильные устройства и аксессуары
                  </Typography>
                </Grid>
              </Link>
              <Link href={'/shop'} className={classes.cardLink}>
                <Grid className={clsx(classes.card, classes.redCard)}>
                  <Typography
                    variant={'h1'}
                    align={'left'}
                    className={classes.cardTitle}
                  >
                    Радиоуправляемая техника
                  </Typography>
                </Grid>
              </Link>
              <Link href={'/shop'} className={classes.cardLink}>
                <Grid className={clsx(classes.card, classes.yellowCard)}>
                  <Typography
                    variant={'h1'}
                    align={'left'}
                    className={classes.cardTitle}
                  >
                    Компьютерная техника
                  </Typography>
                </Grid>
              </Link>
              <Link href={'/shop'} className={classes.cardLink}>
                <Grid className={clsx(classes.card, classes.blueCard)}>
                  <Typography
                    variant={'h1'}
                    align={'left'}
                    className={classes.cardTitle}
                  >
                    Игровые консоли
                  </Typography>
                </Grid>
              </Link>
            </Grid>
          </Grid>
        ) : (
          <Grid className={classes.wrapper}>
            <Grid
              className={classes.cardBlock}
              direction={isSmallWidth ? 'column' : 'row'}
              alignItems={'center'}
            >
              <Grid className={classes.halfCard}>
                <Grid className={clsx(classes.card, classes.greenCard)}>
                  <Typography
                    variant={'h1'}
                    align={'left'}
                    className={classes.cardTitle}
                  >
                    Мобильные устройства и аксессуары
                  </Typography>
                  <Button href={'/shop'} className={classes.button}>
                    Посмотреть товары
                  </Button>
                </Grid>
                <Grid className={clsx(classes.card, classes.redCard)}>
                  <Typography
                    variant={'h1'}
                    align={'left'}
                    className={classes.cardTitle}
                  >
                    Радиоуправляемая техника
                  </Typography>
                  <Button href={'/shop'} className={classes.button}>
                    Посмотреть товары
                  </Button>
                </Grid>
              </Grid>
              <Grid className={classes.halfCard}>
                <Grid className={clsx(classes.card, classes.yellowCard)}>
                  <Typography
                    variant={'h1'}
                    align={'left'}
                    className={classes.cardTitle}
                  >
                    Компьютерная техника
                  </Typography>
                  <Button href={'/shop'} className={classes.button}>
                    Посмотреть товары
                  </Button>
                </Grid>
                <Grid className={clsx(classes.card, classes.blueCard)}>
                  <Typography
                    variant={'h1'}
                    align={'left'}
                    className={classes.cardTitle}
                  >
                    Игровые консоли
                  </Typography>
                  <Button href={'/shop'} className={classes.button}>
                    Посмотреть товары
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
        <Grid item xs={12}>
          <Grid container direction={'column'} spacing={3}>
            <Grid item style={{ padding: '20px 40px' }}>
              <Typography
                variant={'h1'}
                align={isSmallWidth ? 'center' : 'left'}
              >
                Популярное сейчас
              </Typography>
            </Grid>
            <Grid item style={{ padding: '0 0 20px 0' }}>
              {mdWidth ? (
                <Grid
                  container
                  direction={xsWidth ? 'column' : 'row'}
                  justify={'space-around'}
                  alignItems={'center'}
                  spacing={3}
                >
                  {popular3.map((p) => (
                    <Grid item key={`product_${p.id}`}>
                      <ProductCard hit={p} />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Grid
                  container
                  direction={xsWidth ? 'column' : 'row'}
                  justify={'space-around'}
                  alignItems={'center'}
                  spacing={3}
                >
                  {popular5.map((p) => (
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
    </div>
  )
}

export default Main
