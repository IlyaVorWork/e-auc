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
