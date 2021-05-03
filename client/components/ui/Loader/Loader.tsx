import React, { FunctionComponent } from 'react'
import { CircularProgress, Grid } from '@material-ui/core'

import { useStyles } from './Loader.styles'

const Loader: FunctionComponent = () => {
  const classes = useStyles()
  return (
    <Grid
      container
      direction={'column'}
      alignItems={'center'}
      justify={'center'}
      spacing={10}
      className={classes.loaderLayout}
    >
      <Grid item>
        <img src={'/images/eAuc.png'} alt={'eAuc.'} width={292} />
      </Grid>
      <Grid item>
        <CircularProgress />
      </Grid>
    </Grid>
  )
}

export default Loader
