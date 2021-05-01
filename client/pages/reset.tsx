import React from 'react'
import { NextPage } from 'next'

import Layout from '@components/layouts/Layout'
import ResetPassword from '@components/auth/ResetPassword'
import { Grid } from '@material-ui/core'
import { Link } from '@ui/index'

const ResetPage: NextPage = () => (
  <Layout title={'Восстановление пароля'}>
    <Grid
      container
      direction={'column'}
      style={{
        alignItems: 'center',
      }}
    >
      <Grid item style={{ width: '138px', marginBottom: '25px' }}>
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
        <ResetPassword />
      </Grid>
    </Grid>
  </Layout>
)

export default ResetPage
