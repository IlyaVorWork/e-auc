import React, { FunctionComponent, useState } from 'react'
import { Grid, Typography, useMediaQuery, useTheme } from '@material-ui/core'

import SortingSelector from '@components/shop/components/SortingSelector'

import algoliasearch from 'algoliasearch/lite'
import { InstantSearch } from 'react-instantsearch-dom'
import ProductHits from '@components/shop/components/ProductHits'
import ProductSearchBox from '@components/shop/components/ProductSearchBox'
import SideBar from '@components/shop/components/SideBar'
import FiltersMenu from '@components/shop/components/FiltersMenu'
import { useStyles } from '@components/shop/Shop/Shop.styles'
import { Breadcrumbs, Divider } from '@ui/index'

const indexName = 'dev_PRODUCTS'

const searchClient = algoliasearch(
  '03LZGMIZK9',
  '94e7a786ea042d2151d9cdd9a5419c3a'
)

const Shop: FunctionComponent = () => {
  const classes = useStyles()
  const [count, setCount] = useState<number>(0)
  const getCount = (v: number) => setCount(v)

  const theme = useTheme()
  const isSmallWidth = useMediaQuery(theme.breakpoints.down('sm'))
  const isLaptop = useMediaQuery(theme.breakpoints.between(960, 1280))

  return (
    <>
      <Grid
        container
        direction={'column'}
        justify={'flex-start'}
        className={classes.headline}
        spacing={1}
      >
        <Grid item>
          <Breadcrumbs />
        </Grid>
        <Grid item>
          <Typography variant={'h1'}>Магазин</Typography>
        </Grid>
      </Grid>
      <Divider type={'wide'} className={classes.divider} />
      <InstantSearch indexName={indexName} searchClient={searchClient}>
        <Grid
          container
          alignItems={'flex-start'}
          justify={'space-between'}
          spacing={3}
          className={classes.root}
        >
          <Grid item xs={12} lg={9}>
            <Grid container direction={'column'} spacing={4}>
              <Grid item>
                <Grid
                  container
                  alignItems={'center'}
                  justify={isSmallWidth ? 'center' : 'space-between'}
                  direction={isSmallWidth ? 'column' : 'row'}
                  spacing={isSmallWidth ? 2 : 0}
                >
                  {isSmallWidth ? (
                    <Grid item style={{ width: '90%', maxWidth: '360px' }}>
                      <FiltersMenu />
                    </Grid>
                  ) : null}
                  {isLaptop ? (
                    <Grid item xs={12} lg={3}>
                      <SideBar />
                    </Grid>
                  ) : null}
                  <Grid item>
                    <SortingSelector
                      defaultRefinement="dev_products_publishing_date"
                      items={[
                        {
                          value: 'dev_products_publishing_date',
                          label: 'Новинки',
                        },
                        {
                          value: 'dev_products_price_asc',
                          label: `Дешевле`,
                        },
                        {
                          value: 'dev_products_price_desc',
                          label: 'Дороже',
                        },
                        {
                          value: 'dev_products_rating',
                          label: 'По рейтингу',
                        },
                      ]}
                    />
                  </Grid>
                  <Grid
                    item
                    style={isSmallWidth ? { width: '80%' } : { minWidth: 450 }}
                  >
                    <ProductSearchBox />
                  </Grid>
                  <Grid item>
                    <Typography variant={'body2'}>
                      Результатов:&nbsp;{count}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <ProductHits getCount={getCount} />
              </Grid>
            </Grid>
          </Grid>
          {isLaptop || isSmallWidth ? null : (
            <Grid item xs={12} lg={3}>
              <SideBar />
            </Grid>
          )}
        </Grid>
      </InstantSearch>
    </>
  )
}

export default Shop
