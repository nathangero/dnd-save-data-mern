
import { useEffect, useState } from "react";
import { Modal } from "bootstrap/dist/js/bootstrap.min.js";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../firebase.js"
import { useDispatch, useSelector } from "react-redux";
import { USER_ACTIONS } from "../redux/reducers/userReducer.js";
import { useLazyQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries.js";
import { useNavigate } from "react-router-dom";
import ROUTES from "../utils/routes.js";

export default function Login() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [getMe, { loading, data: userData }] = useLazyQuery(GET_ME);

  const [showSignup, setSignup] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  useEffect(() => {
    if (userData) {
      console.log("userData.getMe:", userData.getMe);
      const userInfo = userData.getMe;
      dispatch({ 
        type: USER_ACTIONS.LOGIN,
        user: userInfo
      });

      // navigate(ROUTES.CHARACTERS);
    }
  }, [userData])


  const onChangeLoginEmail = ({ target }) => {
    setLoginEmail(target.value);
  }

  const onChangeLoginPassword = ({ target }) => {
    setLoginPassword(target.value);
  }

  const onChangeSignupUsername = ({ target }) => {
    setSignupUsername(target.value);
  }

  const onChangeSignupEmail = ({ target }) => {
    setSignupEmail(target.value);
  }

  const onChangeSignupPassword = ({ target }) => {
    setSignupPassword(target.value);
  }

  const toggleLoginPassword = () => {
    setShowLoginPassword(!showLoginPassword);
  }

  const toggleSignupPassword = () => {
    setShowSignupPassword(!showSignupPassword);
  }

  const toggleSignup = () => {
    setSignup(!showSignup);
  }

  const toggleModalResetPassword = () => {
    console.log("@toggleModalResetPassword")
    // Show bootstrap modal
  }

  const onSubmitLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      if (!auth.currentUser) throw("couldn't login");
      
      await getMe();
    } catch (error) {
      console.log("couldn't login");
      console.error(error);
    }
  }

  const onSubmitSignup = (e) => {
    e.preventDefault();


  }

  const renderLogin = () => {
    return (
      <>
        <form id="login-form" onSubmit={onSubmitLogin}>
          <label htmlFor="login-email" className="fs-5">Email:</label>
          <input
            id="login-email"
            className="form-control"
            value={loginEmail}
            onChange={onChangeLoginEmail}
            placeholder="test@example.com"
          />
          <br />

          <p htmlFor="login-password" className="fs-5 mb-0">Password:</p>
          <div className="container-fluid d-inline-flex border rounded px-0">
            <input
              id="login-password"
              type={showLoginPassword ? "text" : "password"}
              className="form-control border-0"
              value={loginPassword}
              onChange={onChangeLoginPassword}
              placeholder="******"
            />
            <button className="btn mx-0" onClick={toggleLoginPassword} type="button" ><i className={showLoginPassword ? "bi bi-eye-fill" : "bi bi-eye-slash-fill"}></i></button>
          </div>

          <div className="text-center mt-3">
            <button className="btn theme-button fs-4 px-3" type="submit">Login</button>
          </div>
        </form>

        <br />
        <p className="text-center">Need an account? <a className="" onClick={toggleSignup} type="button">Sign up here</a></p>
        <p className="text-center">Forgot your password? <a className="" onClick={toggleModalResetPassword} type="button">Click here</a></p>
      </>
    )
  }

  const renderSignup = () => {
    return (
      <>
        <form id="signup-form" className="" onSubmit={onSubmitSignup}>
          <label htmlFor="signup-username" className="fs-5">Username:</label>
          <input
            id="signup-username"
            className="form-control"
            value={signupUsername}
            onChange={onChangeSignupUsername}
            placeholder="Billy the Kid"
          />
          <br />

          <label htmlFor="signup-email" className="fs-5">Email:</label>
          <input
            id="signup-email"
            className="form-control"
            value={signupEmail}
            onChange={onChangeSignupEmail}
            placeholder="test@example.com"
          />
          <br />

          <p htmlFor="signup-password" className="fs-5 mb-0">Password:</p>
          <div className="container-fluid d-inline-flex border rounded px-0">
            <input
              id="signup-password"
              type={showSignupPassword ? "text" : "password"}
              className="form-control border-0"
              value={signupPassword}
              onChange={onChangeSignupPassword}
              placeholder="******"
            />
            <button className="btn mx-0" onClick={toggleSignupPassword} type="button"><i className={showSignupPassword ? "bi bi-eye-fill" : "bi bi-eye-slash-fill"}></i></button>
          </div>

          <div className="text-center mt-3">
            <button className="btn theme-button fs-4 px-3" type="submit">Sign Up</button>
          </div>
        </form>

        <br />
        <p className="text-center">Already have an account? <a className="" onClick={toggleSignup} type="button" >Login here</a></p>
      </>
    )
  }

  return (
    <>
      <div className="d-flex flex-column align-items-center">
        <h1 className="text-center">D&D Save Data</h1>
        <img src="/icons8-dungeons-and-dragons-480 copy.svg" width={200} className="img-fluid" alt="D&D image provided by icons8" />
        <div className="container-fluid">

          {!showSignup ?
            renderLogin() :
            renderSignup()
          }
        </div>
      </div>
    </>
  )
}