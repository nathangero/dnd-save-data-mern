import './App.css'
import Nav from "./components/Navbar";
import { Outlet } from "react-router";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { auth } from "../../firebase.js";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ROUTES from "./utils/routes.js";

const httpLink = createHttpLink({
  uri: '/graphql'
});

const authLink = setContext((_, { headers }) => {
  const token = auth.currentUser?.uid;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

function App() {

  const state = useSelector((state) => state);
  const navigate = useNavigate();

  const { user } = state;
  useEffect(() => {
    if (user) navigate(ROUTES.CHARACTERS);
  }, [user]);


  return (
    <>
      <ApolloProvider client={client}>
        {user ?
          <Nav /> :
          null
        }

        <Outlet />
      </ApolloProvider>
    </>
  )
}

export default App
