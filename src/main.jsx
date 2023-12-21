import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { auth } from '../firebase.js';

import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import StoreProvider from "./redux/GlobalState";

import App from './App.jsx';
import Error from "./pages/Error.jsx";
import Campaigns from "./pages/Campaigns.jsx";
import Characters from "./pages/Characters.jsx";
import Sessions from "./pages/Sessions.jsx";
import Login from "./pages/Login.jsx";

const user = auth.currentUser;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/campaigns",
        element: <Campaigns />
      },
      {
        path: "/characters",
        element: <Characters />
      },
      {
        path: "/sessions",
        element: <Sessions />
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StoreProvider>
      {user ?
        <RouterProvider router={router} /> :
        <Login />
      }
    </StoreProvider>

  </React.StrictMode>,
)
