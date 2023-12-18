import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import App from './App.jsx'
import Error from "./pages/Error.jsx";
import Home from "./pages/Home.jsx";
import Campaigns from "./pages/Campaigns.jsx"
import Characters from "./pages/Characters.jsx"
import Sessions from "./pages/Sessions.jsx"

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
    <RouterProvider router={router} />
  </React.StrictMode>,
)
