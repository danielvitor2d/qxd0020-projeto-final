import { provideApolloClient, useMutation } from '@vue/apollo-composable';
import { gql } from 'apollo-boost';

import apolloClient from '@/services/apollo';

provideApolloClient(apolloClient)

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      access_token
    }
  }
`;

const REGISTER_MUTATION = gql`
  mutation Register() {
    createUser(createUserInput: {
      name: "Daniel Vitor",
      email: "danielvitor.p1@gmail.com",
      password: "danielpic123",
      phonenumber: "88996134386",
      roles: "student"
    }) {
      createdAt
      deletedAt
      email
      hashedPassword
      id
      name
      phonenumber
      roles
      updatedAt
    }
  }
`;

export async function login(email: string, password: string) {
  const { mutate } = useMutation(LOGIN_MUTATION);
  try {
    const result = await mutate({ email, password });
    return result?.data.login.access_token
  } catch (error) {
    console.error('Error logging in:', error);
  }
};

export async function createUser() {

}