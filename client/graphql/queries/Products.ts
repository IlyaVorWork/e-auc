import { gql } from '@apollo/client'

const PRODUCTS = gql`
  query {
    products {
      id
      name
      price
      rating
      published_at
      available
      image {
        url
        formats
      }
      categories {
        name
        link
      }
      description
      expire_date
      bids {
        id
        price
        user {
          id
          username
        }
      }
    }
  }
`

export default PRODUCTS
