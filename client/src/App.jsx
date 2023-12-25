import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth } from "../../firebase.js";
import ROUTES from "./utils/routes.js";

import './App.css'
import StoreProvider from "./redux/GlobalState";
import Nav from "./components/Navbar";
import { Outlet } from "react-router";
import Login from "./pages/Login.jsx";
import { useLazyQuery } from "@apollo/client";
import { GET_ME } from "./utils/queries.js";
import { useDispatch } from "react-redux";
import { USER_ACTIONS } from "./redux/reducers/userReducer.js";


function App() {

  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(true);

  const [getMe, { data: userData }] = useLazyQuery(GET_ME);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      console.log("@onAuthStateChanged");
      if (user?.uid) {
        setUserId(user.uid);
        await getMe();
        setLoading(false);
        navigate(ROUTES.CHARACTERS);
      } else {
        setUserId('');
        setLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    if (userData.getMe) {
      console.log("userData:", userData.getMe);
      saveUserInfo();
    }
  }, [userData]);

  const saveUserInfo = () => {
    dispatch({
      type: USER_ACTIONS.LOGIN,
      payload: userData.getMe
    })
  }

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
      <StoreProvider>
        {userId ?
          renderLoggedIn() :
          renderLogin()
        }
      </StoreProvider>
    </>
  )
}

export default App
