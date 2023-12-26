import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../firebase.js";
import { useLazyQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries.js";
import { useDispatch } from "react-redux";
import { USER_ACTIONS } from "../redux/reducer.js";

import ROUTES from "../utils/routes.js";


export default function Home() {

  const state = useState(state => state);
  const [loading, setLoading] = useState(true);

  const [getMe, { data: userData }] = useLazyQuery(GET_ME);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   auth.onAuthStateChanged(async (user) => {
  //     console.log("@onAuthStateChanged");
  //     if (user?.uid) {

  //       await getMe();
  //       // navigate(ROUTES.CHARACTERS);
  //       setLoading(false);
  //     } else {

  //       setLoading(false);
  //     }
  //   });
  // }, []);

  // useEffect(() => {
  //   if (userData?.getMe) {
  //     dispatch({
  //       type: USER_ACTIONS.LOGIN,
  //       user: userData.getMe
  //     })
  //   }
  // }, [userData]);

  // if (loading) {
  //   return (
  //     <>
  //       <h1 className="text-center">Loading...</h1>
  //     </>
  //   )
  // }

  return (
    <>
      <div className="text-center">
        <h1>Welcome to D&D Save Data!</h1>
        <p>Create your D&D character using the 5e character sheet, and freely update it at anytime!</p>
        <br />
        <Link to={ROUTES.LOGIN}>Login</Link>
      </div>
    </>
  )
}