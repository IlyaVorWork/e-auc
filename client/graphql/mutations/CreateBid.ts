import { gql } from '@apollo/client'

const CREATE_BID = gql`
  mutation createBid($input: createBidInput!) {
    createBid(input: $input) {
      bid {
        id
        price
        user {
          id
          username
        }
        product {
          id
          name
          price
        }
      }
    }
  }
`

export default CREATE_BID
