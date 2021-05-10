import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from 'react'
import { Grid, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import { useSnackbar } from 'notistack'

import { IconButton, Link } from '@ui/index'
import { logoutUser } from '@utils/auth'
import { AppContext } from '@providers/AppProvider'
import { ILayoutProps } from '@interfaces/layouts'
import { errorMessage } from '@hooks/auth/errorMessage'

import { useStyles } from './GeneralLayout.styles'

import { ThemeContext } from '@providers/ThemeProvider'

import * as ThemeActions from '@actions/theme'
import { ThemeType } from '@interfaces/theme'
import clsx from 'clsx'
import Footer from '@components/main/Footer'
import { useQuery } from '@apollo/client'
import ME from '@graphql/queries/Me'
import * as ACTIONS from '@actions/auth'
import { useRouter } from 'next/router'

const GeneralLayout: FunctionComponent<ILayoutProps> = ({ children }) => {
  const { state, dispatch } = useContext(AppContext)
  const { dispatch: themeDispatch } = useContext(ThemeContext)
  const { isAuthenticated } = state
  const { enqueueSnackbar } = useSnackbar()
  const { data, loading, error } = useQuery(ME)
  const router = useRouter()

  useEffect(() => {
    if (!loading && data) {
      dispatch(ACTIONS.authSuccess({ user: { ...data.me, ...data.self } }))
    }
    if (error) logoutUser(dispatch)
  }, [data, loading])

  const classes = useStyles()

  const logout = async () => {
    try {
      await logoutUser(dispatch)
      enqueueSnackbar('Вы успешно вышли', {
        variant: 'success',
      })
      await router.push('/signin')
    } catch (error) {
      enqueueSnackbar(errorMessage(error), {
        variant: 'error',
      })
    }
  }

  const swapTheme = async (t: ThemeType) =>
    await themeDispatch(ThemeActions.changeTheme(t))

  const theme: any = useTheme()

  const [isHidden, setIsHidden] = useState<string>('hidden')

  const isSmallWidth = useMediaQuery(theme.breakpoints.down('sm'))
  return (
    <>
      <header className={classes.header}>
        {isSmallWidth ? (
          <>
            <Grid
              container
              justify={'space-between'}
              spacing={isSmallWidth ? 2 : 1}
              alignItems={'center'}
              direction={'row'}
              className={classes.topCont}
            >
              <Grid className={classes.themeSwitch}>
                <Grid spacing={1}>
                  {theme.name == 'Light Theme' ? (
                    <Grid>
                      <IconButton
                        icon={'moon'}
                        onClick={() => swapTheme('Dark')}
                        className={clsx(classes.themeIcon, classes.moon)}
                      />
                    </Grid>
                  ) : (
                    <Grid>
                      <IconButton
                        icon={'sun'}
                        onClick={() => swapTheme('Light')}
                        className={clsx(classes.themeIcon, classes.sun)}
                      />
                    </Grid>
                  )}
                </Grid>
              </Grid>
              <Grid className={classes.logo}>
                <Link href={'/'} style={{ border: 'none' }}>
                  e<span className={classes.partLogo}>Auc</span>.
                </Link>
              </Grid>
              <Grid>
                <IconButton
                  icon={'dehaze'}
                  onClick={
                    isHidden == 'hidden'
                      ? () => setIsHidden('unhidden')
                      : () => setIsHidden('hidden')
                  }
                  className={clsx(classes.themeIcon, classes.burger)}
                />
              </Grid>
            </Grid>
            <Grid>
              <Grid
                container
                className={
                  isHidden == 'hidden' && isSmallWidth
                    ? classes.hidden
                    : classes.unhidden
                }
                direction={isSmallWidth ? 'column' : 'row'}
                justify={isSmallWidth ? 'center' : 'space-between'}
                alignItems={'center'}
              >
                {isAuthenticated ? (
                  <>
                    <Grid className={classes.menuItem}>
                      <Link href={'/'} className={classes.link}>
                        Главная
                      </Link>
                    </Grid>
                    <Grid className={classes.menuItem}>
                      <Link href={'/shop'} className={classes.link}>
                        Магазин
                      </Link>
                    </Grid>
                    <Grid className={classes.menuItem}>
                      <Link
                        href={'/my-account?panel=0'}
                        className={classes.link}
                      >
                        Мой аккаунт
                      </Link>
                    </Grid>
                    <Grid className={classes.menuItem}>
                      <Link
                        href={'/my-account?panel=1'}
                        className={classes.link}
                      >
                        Корзина
                      </Link>
                    </Grid>
                    <Grid className={classes.menuItem}>
                      <Link
                        href={'/my-account?panel=3'}
                        className={classes.link}
                      >
                        Избранное
                      </Link>
                    </Grid>
                    <Grid className={classes.menuItem}>
                      <Link href={'/contacts'} className={classes.link}>
                        Контакты
                      </Link>
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid className={classes.menuItem}>
                      <Link href={'/'} className={classes.link}>
                        Главная
                      </Link>
                    </Grid>
                    <Grid className={classes.menuItem}>
                      <Link href={'/shop'} className={classes.link}>
                        Магазин
                      </Link>
                    </Grid>
                    <Grid className={classes.menuItem}>
                      <Link href={'/contacts'} className={classes.link}>
                        Контакты
                      </Link>
                    </Grid>
                  </>
                )}
                <Grid>
                  {isAuthenticated ? (
                    <Grid className={classes.menuItem}>
                      <span
                        onClick={async () => await logout()}
                        className={classes.link}
                      >
                        Выход
                      </span>
                    </Grid>
                  ) : (
                    <Grid
                      container
                      spacing={1}
                      alignItems={'center'}
                      direction={'column'}
                    >
                      <Grid className={classes.menuItem}>
                        <Link href={'/signup'} className={classes.link}>
                          Регистрация
                        </Link>
                      </Grid>
                      <Grid className={classes.menuItem}>
                        <Link href={'/signin'} className={classes.link}>
                          Вход
                        </Link>
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </>
        ) : (
          <Grid
            container
            justify={'space-between'}
            spacing={isSmallWidth ? 2 : 1}
            alignItems={'center'}
            direction={'row'}
          >
            <Grid className={classes.logo}>
              <Link href={'/'} style={{ border: 'none' }}>
                e<span className={classes.partLogo}>Auc</span>.
              </Link>
            </Grid>
            <Grid className={classes.themeSwitch}>
              <Grid spacing={1}>
                {theme.name == 'Light Theme' ? (
                  <Grid>
                    <IconButton
                      icon={'moon'}
                      onClick={() => swapTheme('Dark')}
                      className={clsx(classes.themeIcon, classes.moon)}
                    />
                  </Grid>
                ) : (
                  <Grid>
                    <IconButton
                      icon={'sun'}
                      onClick={() => swapTheme('Light')}
                      className={clsx(classes.themeIcon, classes.sun)}
                    />
                  </Grid>
                )}
              </Grid>
            </Grid>
            <Grid>
              <Grid
                container
                className={
                  isHidden == 'hidden' && isSmallWidth
                    ? classes.hidden
                    : classes.unhidden
                }
                direction={isSmallWidth ? 'column' : 'row'}
                justify={isSmallWidth ? 'center' : 'space-between'}
                alignItems={'center'}
              >
                {isAuthenticated ? (
                  <>
                    <Grid className={classes.menuItem}>
                      <Link href={'/'} className={classes.link}>
                        Главная
                      </Link>
                    </Grid>
                    <Grid className={classes.menuItem}>
                      <Link href={'/shop'} className={classes.link}>
                        Магазин
                      </Link>
                    </Grid>
                    <Grid className={classes.menuItem}>
                      <Link
                        href={'/my-account?panel=0'}
                        className={classes.link}
                      >
                        Мой аккаунт
                      </Link>
                    </Grid>
                    <Grid className={classes.menuItem}>
                      <Link
                        href={'/my-account?panel=1'}
                        className={classes.link}
                      >
                        Корзина
                      </Link>
                    </Grid>
                    <Grid className={classes.menuItem}>
                      <Link
                        href={'/my-account?panel=3'}
                        className={classes.link}
                      >
                        Избранное
                      </Link>
                    </Grid>
                    <Grid className={classes.menuItem}>
                      <Link href={'/contacts'} className={classes.link}>
                        Контакты
                      </Link>
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid className={classes.menuItem}>
                      <Link href={'/'} className={classes.link}>
                        Главная
                      </Link>
                    </Grid>
                    <Grid className={classes.menuItem}>
                      <Link href={'/shop'} className={classes.link}>
                        Магазин
                      </Link>
                    </Grid>
                    <Grid className={classes.menuItem}>
                      <Link href={'/contacts'} className={classes.link}>
                        Контакты
                      </Link>
                    </Grid>
                  </>
                )}
                <Grid>
                  {isAuthenticated ? (
                    <Grid className={classes.menuItem}>
                      <span
                        onClick={async () => await logout()}
                        className={classes.link}
                      >
                        Выход
                      </span>
                    </Grid>
                  ) : (
                    <Grid container spacing={1} alignItems={'center'}>
                      <Grid className={classes.menuItem}>
                        <Link href={'/signup'} className={classes.link}>
                          Регистрация
                        </Link>
                      </Grid>
                      <Grid className={classes.menuItem}>
                        <Link href={'/signin'} className={classes.link}>
                          Вход
                        </Link>
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
      </header>
      <main className={classes.root}>{children}</main>
      <footer className={classes.footer}>
        <Footer />
        <Typography
          variant={'body1'}
          align={'center'}
          className={classes.copyright}
        >
          <Grid className={classes.footerLogo}>
            &#169; 2021 e
            <span style={{ color: theme.palette.primary.light }}>Auc</span>. Все
            права защищены
          </Grid>
        </Typography>
      </footer>
    </>
  )
}

export default GeneralLayout
