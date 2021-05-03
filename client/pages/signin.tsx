import React from 'react'
import { NextPage } from 'next'

import Login from '@components/auth/Login'
import Layout from '@components/layouts/Layout'
import { Grid } from '@material-ui/core'
import { Link } from '@ui/index'

const SignInPage: NextPage = () => {
  return (
    <Layout title="Вход | eAuc.">
      <Grid
        container
        direction={'column'}
        style={{
          alignItems: 'center',
        }}
      >
        <Grid item style={{ width: '100%', marginBottom: '25px', textAlign: 'center' }}>
          <Link
            href={'/'}
            style={{
              border: 'none',
              width: '138px',
            }}
          >
            <span
              style={{
                width: '138px',
                padding: '24px 0',
                fontWeight: 500,
                fontSize: '54px',
                lineHeight: '56px',
              }}
            >
              e
              <span
                style={{
                  color: '#ea3547',
                }}
              >
                Auc
              </span>
              .
            </span>
          </Link>
        </Grid>
        <Grid item>
          <Login />
        </Grid>
      </Grid>
    </Layout>
  )
}

export default SignInPage
