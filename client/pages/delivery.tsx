import React from 'react'
import { NextPage } from 'next'

import Layout from '@components/layouts/Layout'
import Delivery from '@components/delivery'

const DeliveryPage: NextPage = () => (
  <Layout title={'Доставка | eAuc.'}>
    <Delivery />
  </Layout>
)

export default DeliveryPage
