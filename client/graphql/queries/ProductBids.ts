import { gql } from '@apollo/client'

const PRODUCT_BIDS = gql`
  query productbids($id: ID!) {
    product(id: $id) {
      id
      name
      price
      available
      bids(sort: "price") {
        createdAt
        price
        added
        user {
          id
          username
        }
      }
    }
  }
`

export default PRODUCT_BIDS
