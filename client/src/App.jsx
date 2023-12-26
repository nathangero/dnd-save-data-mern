import './App.css'
import Nav from "./components/Navbar";
import { Outlet } from "react-router";

// import {
//   ApolloClient,
//   InMemoryCache,
//   ApolloProvider,
//   createHttpLink,
// } from '@apollo/client';
// import { setContext } from '@apollo/client/link/context';
import { auth } from "../../firebase.js";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ROUTES from "./utils/routes.js";
import { useLazyQuery } from "@apollo/client";
import { GET_ME } from "./utils/queries.js";
import { USER_ACTIONS } from "./redux/reducer.js";

// const httpLink = createHttpLink({
//   uri: '/graphql'
// });

// const authLink = setContext((_, { headers }) => {
//   const token = auth.currentUser?.uid;
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : ''
//     }
//   }
// });

// const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache()
// })

function App() {

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [getMe, { data: userData }] = useLazyQuery(GET_ME);

  const [loading, setLoading] = useState(true);

  const { user } = state;

  // Sets the Firebase auth listener. Determines if the user should be logged in or not
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      console.log("@onAuthStateChanged");
      if (user?.uid) {
        console.log("user is logged in")
        await getMe();
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    if (userData) {
      // console.log("userData.getMe:", userData.getMe);
      const userInfo = userData.getMe;
      dispatch({ 
        type: USER_ACTIONS.LOGIN,
        user: userInfo
      });

      // Move the user to the /character page once their info has been loaded
      navigate(ROUTES.CHARACTERS);
    }
  }, [userData]);

  if (loading) {
    return (
      <>
        <h1 className="text-center">Loading...</h1>
      </>
    )
  }

  return (
    <>
        {user ?
          <Nav /> :
          null
        }
        <Outlet />
    </>
  )
}

export default App
