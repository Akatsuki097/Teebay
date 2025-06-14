import { gql } from '@apollo/client'

export const ALL_PRODUCTS_QUERY = gql`
  query AllProducts {
    allProducts {
      id
      title
      category
      description
      price
      summary
      createdBy {
        id
        firstName
        lastName
        email
      }
    }
  }
`

export const MY_PRODUCTS_QUERY = gql`
  query MyProducts {
    myProducts {
      id
      title
      category
      description
      price
      summary
      createdBy {
        id
        firstName
        lastName
        email
      }
    }
  }
`

export const GET_PRODUCT_QUERY = gql`
  query GetProduct($id: ID!) {
    productById(id: $id) {
      id
      title
      category
      description
      price
      summary
      createdBy {
        id
        firstName
        lastName
        email
      }
    }
  }
`

export const CREATE_PRODUCT_MUTATION = gql`
  mutation CreateProduct($input: ProductInput!) {
    createProduct(input: $input) {
      id
      title
      category
      description
      price
      summary
      createdBy {
        id
        firstName
        lastName
        email
      }
    }
  }
`

export const UPDATE_PRODUCT_MUTATION = gql`
  mutation UpdateProduct($id: ID!, $input: ProductInput!) {
    updateProduct(id: $id, input: $input) {
      id
      title
      category
      description
      price
      summary
      createdBy {
        id
        firstName
        lastName
        email
      }
    }
  }
`

export const DELETE_PRODUCT_MUTATION = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`