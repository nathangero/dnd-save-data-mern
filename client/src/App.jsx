import './App.css'
import StoreProvider from "./redux/GlobalState"
import Nav from "./components/Navbar"
import { Outlet } from "react-router"

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: '/graphql'
});

const authLink = setContext((_, { headers }) => {
  // const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      // authorization: token ? `Bearer ${token}` : ''
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

function App() {
  return (
    <>
      <StoreProvider>
        <ApolloProvider client={client}>
          <Nav />
          <Outlet />
        </ApolloProvider>
      </StoreProvider>
    </>
  )
}

export default App
