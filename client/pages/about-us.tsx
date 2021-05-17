import React from 'react'
import { NextPage } from 'next'

import Layout from '@components/layouts/Layout'
import Contacts from '@components/contacts/Contacts'

const ContactsPage: NextPage = () => (
  <Layout title={'О нас | eAuc.'}>
    <Contacts />
  </Layout>
)

export default ContactsPage
