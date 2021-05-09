import { gql } from '@apollo/client'

const ME = gql`
  query {
    me {
      id
      username
      email
      confirmed
    }
    self {
      email_subscriber {
        id
        email
      }
      role {
        name
      }
      addresses {
        id
        address
      }
      avatar {
        url
        id
      }
      orders {
        id
        total
        products
        createdAt
        address
      }
      bids {
        id
        price
        product {
          id
          name
        }
      }
    }
  }
`

export default ME
