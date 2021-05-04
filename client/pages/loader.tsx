import React from 'react'
import { NextPage } from 'next'

import Layout from '@components/layouts/Layout'
import Loader from '@components/ui/Loader'

const LoaderPage: NextPage = () => (
  <Layout title="Загрузка | eAuc.">
    <Loader />
  </Layout>
)

export default LoaderPage
