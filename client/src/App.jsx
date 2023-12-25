import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth } from "../../firebase.js";
import ROUTES from "./utils/routes.js";

import './App.css'
import StoreProvider from "./redux/GlobalState";
import Nav from "./components/Navbar";
import { Outlet } from "react-router";
import Login from "./pages/Login.jsx";

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

  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      console.log("@onAuthStateChanged");
      if (user?.uid) {
        setUserId(user.uid);
        setLoading(false);
        navigate(ROUTES.CHARACTERS);
      } else {
        setUserId('');
        setLoading(false);
      }
    });
  }, [])

  const renderLoggedIn = () => {
    return (
      <>
        <Nav />
        <Outlet />
      </>
    )
  }

  const renderLogin = () => {
    return (<Login />)
  }

  if (loading) {
    return (
      <>
        <h1 className="text-center">Loading...</h1>
      </>
    )
  }

  return (
    <>
      <ApolloProvider client={client}>
        <StoreProvider>
          {userId ?
            renderLoggedIn() :
            renderLogin()
          }
        </StoreProvider>
      </ApolloProvider>

    </>
  )
}

export default App
