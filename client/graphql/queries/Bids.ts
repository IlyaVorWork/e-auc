import { gql } from '@apollo/client'

const BIDS = gql`
  query {
    bids {
      price
      user {
        username
      }
      product {
        name
      }
    }
  }
`

export default BIDS
