import { gql } from '@apollo/client'

const UPDATE_USER = gql`
  mutation updateUser($input: updateUserInput) {
    updateUser(input: $input) {
      user {
        id
        username
        email
        confirmed
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
  }
`

export default UPDATE_USER
