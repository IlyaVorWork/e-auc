import { gql } from '@apollo/client'

const UPDATE_PRICE = gql`
  mutation updateProduct($input: updateProductInput) {
    updateProduct(input: $input) {
      product {
        id
        name
        price
      }
    }
  }
`

export default UPDATE_PRICE
