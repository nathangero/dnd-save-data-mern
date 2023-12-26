import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";


import App from './App.jsx'
import Error from "./pages/Error.jsx";
import Home from "./pages/Home.jsx";
import Campaigns from "./pages/Campaigns.jsx"
import Characters from "./pages/Characters.jsx"
import Sessions from "./pages/Sessions.jsx"
import Login from "./pages/Login.jsx";
import StoreProvider from "./redux/GlobalState";

import ROUTES from "./utils/routes.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />
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
        path: ROUTES.LOGIN,
        element: <Login />
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
      <RouterProvider router={router} />
    </StoreProvider>
  </React.StrictMode>,
)
