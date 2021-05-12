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
        createdAt
        id
        price
        added
        product {
          id
          name
          expire_date
          image {
            url
          }
          bids {
            id
            added
            user {
              id
              username
            }
            price
          }
        }
      }
    }
  }
`

export default ME
