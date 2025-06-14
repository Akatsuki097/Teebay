import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import {setContext} from '@apollo/client/link/context';


const httpLink = createHttpLink({ uri: 'http://localhost:8080/graphql' });
const cache = new InMemoryCache({
    typePolicies: {
      Product: {
        keyFields: ['id']      
      },
      User: {
        keyFields: ['id']
      }
    }
  });

const authLink = setContext((_,{headers}) =>{
  const token = localStorage.getItem('token');
  return {headers:{...headers, authorization: token ? `Bearer ${token}` : '' } };
})


export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache
});