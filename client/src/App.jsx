import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useState } from "react";

import { auth } from "../../server/utils/firebase.js";

import './App.css'
import StoreProvider from "./redux/GlobalState";
import Nav from "./components/Navbar";
import { Outlet } from "react-router";

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

  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(true);

  auth.onAuthStateChanged(async (user) => {
    console.log("@onAuthStateChanged");
    if (user.uid) {
      setUserId(user.uid);
      setLoading(false)
    }
  });

  const renderLoggedIn = () => {
    return (
      <>
        <ApolloProvider client={client}>
          <StoreProvider>
            <Nav />
            <Outlet />
          </StoreProvider>
        </ApolloProvider>
      </>
    )
  }

  const renderLogin = () => {
    return (
      <>
        <h1>Login screen</h1>
      </>
    )
  }

  return (
    <>
      {userId ?
        renderLoggedIn() :
        renderLogin()
      }
    </>
  )
}

export default App
