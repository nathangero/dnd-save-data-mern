import './App.css'
import Nav from "./components/Navbar";
import { Outlet } from "react-router";

import { auth } from "../../firebase/firebase.js";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { GET_ME } from "./utils/queries.js";
import { USER_ACTIONS } from "./redux/reducer.js";

import ROUTES from "./utils/routes.js";
import LoadingSpinner from "./components/LoadingSpinner/index.jsx";

function App() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [getMe] = useLazyQuery(GET_ME);

  const [loading, setLoading] = useState(true);

  // const { user } = state;

  // Sets the Firebase auth listener. Determines if the user should be logged in or not
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      // console.log("@onAuthStateChanged");
      if (user?.uid) {
        // console.log("logging in user:", user.uid);

        // Get user info before removing "Loading" text
        const { data } = await getMe();
        if (!data?.getMe) return;

        const { _id, username, characters } = data.getMe;

        // Store the characters as an object instead of an array. The key is the character's _id
        const charactersObj = {}
        Object.values(characters).map((character) => {
          charactersObj[character._id] = character;
        })
        
        const userInfo = { _id, username, characters: charactersObj }
        
        dispatch({
          type: USER_ACTIONS.LOGIN,
          user: userInfo
        });
        
        // Move the user to the /character page once their info has been loaded
        navigate(ROUTES.CHARACTERS);
        setLoading(false);
      } else {
        // Just remove the "Loading" text right away
        setLoading(false);
      }
    });
  }, []);

  // When the user information has been retrieved, save it into the store state
  // useEffect(() => {
  //   if (userData) {
  //     // console.log("userData.getMe:", userData.getMe);

  //     // Don't send user to characters page if nothing is retrieved from the db
  //     if (!userData?.getMe) return;

  //     const userInfo = userData.getMe;
  //     dispatch({
  //       type: USER_ACTIONS.LOGIN,
  //       user: userInfo
  //     });

  //     // Move the user to the /character page once their info has been loaded
  //     navigate(ROUTES.CHARACTERS);
  //   }
  // }, [userData]);

  if (loading) {
    return (
      <>
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
          <LoadingSpinner spinnerText={"Loading..."} useModal={false} />
        </div>
      </>
    )
  }

  return (
    <>
      {auth.currentUser?.uid ? // Only show Nav bar if the user is logged in
        <Nav /> :
        null
      }
      <Outlet />
    </>
  )
}

export default App
