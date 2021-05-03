import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Menu from '@components/shop/components/Menu'
import { Grid } from '@material-ui/core'
import PriceRange from '@components/shop/components/PriceRange'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.background.paper,
      padding: 0,
      border: '1px solid' + theme.palette.primary.contrastText,
    },
    filterItem: {
      marginTop: 20,
      marginLeft: '10%',
      width: '80%',
    },
    filterButton: {
      padding: '16px',
    },
  })
)

export default function NestedList() {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <ListItem button onClick={handleClick} className={classes.filterButton}>
        <ListItemText primary="Фильтры" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div">
          <Grid item className={classes.filterItem}>
            <Menu attribute={'categories.name'} />
          </Grid>
        </List>
        <List component="div">
          <Grid item className={classes.filterItem}>
            <PriceRange
              attribute={'price'}
              defaultRefinement={{
                min: 0,
                max: 500000,
              }}
              min={0}
              max={500000}
            />
          </Grid>
        </List>
      </Collapse>
    </List>
  )
}
