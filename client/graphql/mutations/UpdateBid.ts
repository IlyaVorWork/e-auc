import { gql } from '@apollo/client'

const UPDATE_BID = gql`
  mutation updateBid($input: updateBidInput) {
    updateBid(input: $input) {
      bid {
        user {
          id
          username
        }
        product {
          id
          name
        }
        price
        added
      }
    }
  }
`

export default UPDATE_BID
