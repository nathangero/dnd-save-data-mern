import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";


import App from './App.jsx'
import Error from "./pages/Error.jsx";
import Campaigns from "./pages/Campaigns.jsx"
import Characters from "./pages/Characters.jsx"
import Sessions from "./pages/Sessions.jsx"
import Login from "./pages/Login.jsx";
import StoreProvider from "./redux/GlobalState";

import ROUTES from "./utils/routes.js";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { auth } from "../../firebase/firebase.js";
import CharacterPage from "./components/CharacterPage/index.jsx";
import CharacterCreate from "./components/CharacterCreate/index.jsx";

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


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Login />
      },
      {
        path: ROUTES.CAMPAIGNS,
        element: <Campaigns />
      },
      {
        path: ROUTES.CHARACTERS,
        element: <Characters />
      },
      {
        path: ROUTES.CHARACTERS + "/:characterId",
        element: <CharacterPage />
      },
      {
        path: ROUTES.CHARACTER_CREATE,
        element: <CharacterCreate />
      },
      {
        path: ROUTES.SESSIONS,
        element: <Sessions />
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StoreProvider>
      <ApolloProvider client={client}>
        <RouterProvider router={router} />
      </ApolloProvider>
    </StoreProvider>
  </React.StrictMode>,
)
