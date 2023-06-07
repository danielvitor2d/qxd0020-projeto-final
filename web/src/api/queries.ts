import { useQuery } from '@vue/apollo-composable'
import { gql } from 'apollo-boost'

const GET_USERS_QUERY = gql`
  query {
    users {
      id
      name
      email
      phonenumber
      roles
    }
  }
`

export async function fetchUsers() {
  try {
    const { result } = useQuery(GET_USERS_QUERY)
    return result?.value
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}
