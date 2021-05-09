import { gql } from '@apollo/client'

const ProductBids = gql`
  query productbids($id: ID!) {
    product(id: $id) {
      id
      name
      price
      bids {
        price
        user {
          id
          username
        }
      }
    }
  }
`

export default ProductBids
