import React, { FunctionComponent, useState } from 'react'
import { Paper, Grid, Typography } from '@material-ui/core'
import { useRouter } from 'next/router'

import { Link } from '@ui/index'
import ResetPasswordForm from '../ResetPasswordForm'
import ForgotPasswordForm from '../ForgotPasswordForm'

import { useStyles } from './ResetPassword.styles'

const ResetPassword: FunctionComponent = () => {
  const classes = useStyles()
  const router = useRouter()
  const code = router.query?.code
  const [emailSend, setEmailSend] = useState<boolean>(false)
  const [emailFormik, setFormikEmail] = useState<string>('')

  const setEmailData = (value: boolean) => {
    setEmailSend(value)
  }

  const setFormikEmailData = (value: string) => {
    setFormikEmail(value)
  }

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="space-between"
    >
      <Grid item className={classes.container}>
        <Paper
          className={classes.formPaper}
          style={{
            borderRadius: '30px 30px 0px 0px',
          }}
          elevation={1}
          square
        >
          <Grid
            container
            direction="column"
            alignItems="center"
            justify="space-between"
          >
            <Grid item>
              <Typography variant="h2" className={classes.heading}>
                {emailSend ? 'Письмо отправлено' : 'Восстановление пароля'}
              </Typography>
            </Grid>
            <Grid item>
              {code ? (
                <ResetPasswordForm />
              ) : emailSend ? (
                <Typography component="p" className={classes.heading}>
                  <span>
                    Проверьте ваш email адрес
                    <br />
                    <strong>{emailFormik}</strong>
                  </span>
                </Typography>
              ) : (
                <ForgotPasswordForm
                  setEmailData={setEmailData}
                  setFormikEmailData={setFormikEmailData}
                />
              )}
            </Grid>
          </Grid>
        </Paper>
        <Paper
          className={classes.registerPaper}
          style={{
            borderRadius: '0px 0px 30px 30px',
          }}
          elevation={1}
          square
        >
          <Grid container justify="center" alignContent="center">
            <Grid item>
              <Link href={'/signin'} className={classes.link}>
                Войти
              </Link>{' '}
              или{' '}
              <Link href={'/signup'} className={classes.link}>
                Зарегистрироваться
              </Link>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default ResetPassword
