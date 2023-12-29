import { gql } from "@apollo/client";

export const ADD_USER = gql`
mutation AddUser($_id: String!, $username: String!) {
  addUser(_id: $_id, username: $username) {
    _id
    username
  }
}
`;