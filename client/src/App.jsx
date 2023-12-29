import './App.css'
import Nav from "./components/Navbar";
import { Outlet } from "react-router";

import { auth } from "../../firebase.js";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { GET_ME } from "./utils/queries.js";
import { USER_ACTIONS } from "./redux/reducer.js";

import ROUTES from "./utils/routes.js";

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
      // console.log("@onAuthStateChanged");
      if (user?.uid) {
        console.log("logging in user:", user.uid);
        // Get user info before removing "Loading" text
        await getMe();

        setLoading(false);
      } else {
        // Just remove the "Loading" text right away
        setLoading(false);
      }
    });
  }, []);

  // When the user information has been retrieved, save it into the store state
  useEffect(() => {
    if (userData) {
      console.log("userData.getMe:", userData.getMe);
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
      {user ? // Only show Nav bar if the user is logged in
        <Nav /> :
        null
      }
      <Outlet />
    </>
  )
}

export default App
