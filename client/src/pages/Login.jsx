/* eslint-disable react/no-unescaped-entities */

import { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Modal } from "bootstrap/dist/js/bootstrap.min.js";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../firebase.js";
import { ADD_USER } from "../utils/mutations.js";
import ROUTES from "../utils/routes.js";
import Alert from "../components/Alert/index.jsx";
import { CHECK_USER } from "../utils/queries.js";

const ALERT_TYPE = {
  INVALID_LOGIN: "invalid_login",
  INVALID_SIGNUP_USERNAME: "invalid_signup_username",
  INVALID_SIGNUP_EMAIL: "invalid_signup_email",
}

export default function Login() {

  const [modalAlert, setModalAlert] = useState(null);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertBody, setAlertBody] = useState('');

  const [modalResetPassword, setModalResetPassword] = useState(null);
  const [didSendResetPassword, setDidSendResetPassword] = useState(false);
  const [isSendingResetPassword, setIsSendingResetPassword] = useState(false); // Shows the user text that the password reset email is sending

  const [showSignup, setSignup] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const [isSignupUsernameValid, setIsSignupUsernameValid] = useState(false);
  const [isCheckingUsernameAvailablility, setIsCheckingUsernameAvailablility] = useState(false);
  const [isSignupUsernameAvailable, setIsSignupUsernameAvailable] = useState(false);
  const [isSignupEmailValid, setIsSignupEmailValid] = useState(false);
  const [isSignupPasswordValid, setIsSignupPasswordValid] = useState(false);

  const [passwordResetEmail, setPasswordResetEmail] = useState('');
  const [isResetPasswordEmailInvalid, setIsResetPasswordEmailInvalid] = useState(false);

  const [timeoutId, setTimeoutId] = useState(null);

  // const [addUser, { error: addUserError, data: addUserData }] = useMutation(ADD_USER);
  const [addUser] = useMutation(ADD_USER);
  const [checkUser] = useLazyQuery(CHECK_USER);


  useEffect(() => {
    // Initialize bootstrap modals 
    const modalError = document.querySelector(".alert-modal-error").querySelector("#alertModal");
    setModalAlert(new Modal(modalError));

    const modalResetPass = document.querySelector(".alert-modal-reset-password").querySelector("#alertModal");
    setModalResetPassword(new Modal(modalResetPass));
  }, []);

  // Disables Sign Up button if username and password criteria all pass
  useEffect(() => {
    let signupButton = document.querySelector(".button-signup");
    if (signupButton && isSignupUsernameValid && !isCheckingUsernameAvailablility && isSignupUsernameAvailable && isSignupEmailValid && isSignupPasswordValid) signupButton.removeAttribute("disabled");
    else if (signupButton) signupButton.setAttribute("disabled", null);
  }, [isSignupUsernameValid, isCheckingUsernameAvailablility, isSignupUsernameAvailable, isSignupEmailValid, isSignupPasswordValid]);

  /**
   * Checks the database if the username is available to use.
   * If `data` is null, the username is available,
   * else the username is taken already.
   * @param {String} username 
   */
  const checkUsernameAvailability = async (username) => {
    try {
      const { data } = await checkUser({
        variables: { username }
      });

      // console.log("data?.checkUser:", data?.checkUser);
      setIsCheckingUsernameAvailablility(false);

      // If the username already exists, don't let the user sign up
      if (data?.checkUser) {
        // console.log("username already exists");
        setIsSignupUsernameAvailable(false);
      } else {
        setIsSignupUsernameAvailable(true);
      }
    } catch (error) {
      // This shouldn't really run
      console.log("Couldn't check db for username");
      console.error(error);
    }
  }

  const onChangeLoginEmail = ({ target }) => {
    setLoginEmail(target.value);
  }

  const onChangeLoginPassword = ({ target }) => {
    setLoginPassword(target.value);
  }

  /**
   * Updates the `signupUsername` variable as the user types in the input field.
   * After the user stops typing for a certain amount of milliseconds, the `checkUsernameAvailability()` function will be called.
   * @param {Event} event 
   * @returns null if username isn't valid
   */
  const onChangeSignupUsername = ({ target }) => {
    const username = target.value;
    setSignupUsername(username);

    if (username.length < 3 || username.length >= 30) {
      setIsSignupUsernameValid(false);
      return;
    }

    setIsSignupUsernameValid(true);

    // Check username availability after user stops typing
    setIsCheckingUsernameAvailablility(true);
    setTimeoutId(clearTimeout(timeoutId)); // Prevents timer from triggering until user has completely stopped typing
    setTimeoutId(setTimeout(async () => {
      await checkUsernameAvailability(username);
    }, 750)
    );
  }

  const onChangeSignupEmail = ({ target }) => {
    setSignupEmail(target.value);

    // Checks if the email entered is valid
    var regex = /^([+\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    setIsSignupEmailValid(regex.test(target.value));
  }

  const onChangeSignupPassword = ({ target }) => {
    setSignupPassword(target.value);
    if (target.value.length >= 6) setIsSignupPasswordValid(true);
    else setIsSignupPasswordValid(false);
  }

  const onChangePasswordResetEmail = ({ target }) => {
    setPasswordResetEmail(target.value);
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

  const toggleModalError = (alertType) => {
    switch (alertType) {
      case ALERT_TYPE.INVALID_LOGIN:
        setAlertTitle("Invalid Login");
        setAlertBody("Email or password is invalid. Please check your credentials and try again.");
        break;

      case ALERT_TYPE.INVALID_SIGNUP_EMAIL:
        setAlertTitle("Invalid Sign Up");
        setAlertBody("Email already in use.");
        break;

      case ALERT_TYPE.INVALID_SIGNUP_USERNAME:
        setAlertTitle("Invalid Sign Up");
        setAlertBody("Username already exists. Please try another.");
        break;
    }

    modalAlert.toggle();
  }

  const toggleModalResetPassword = () => {
    setDidSendResetPassword(false);
    modalResetPassword.toggle();
  }

  const onSubmitLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      if (!auth.currentUser) throw ("couldn't login");
    } catch (error) {
      console.log("couldn't login");
      console.error(error);
      toggleModalError(ALERT_TYPE.INVALID_LOGIN);
    }
  }

  const onSubmitSignup = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, signupEmail, signupPassword);
      if (!auth.currentUser) throw ("firebase: couldn't sign up");
      // console.log("auth.currentUser:", auth.currentUser.uid);

      await addUser({
        variables: {
          _id: auth.currentUser.uid,
          username: signupUsername
        }
      });

      // Redirect the user to the /characters page and force a refresh.
      window.location.href = ROUTES.CHARACTERS;
    } catch (error) {
      console.log("couldn't sign up");
      console.error(error);
      console.log("error.code:", error.code)
      toggleModalError(ALERT_TYPE.INVALID_SIGNUP_EMAIL);
    }
  }

  const onSubmitResetPassword = async (e) => {
    e.preventDefault();

    try {
      setIsSendingResetPassword(true);
      await sendPasswordResetEmail(auth, passwordResetEmail);
      setIsSendingResetPassword(false);
      setPasswordResetEmail('');
      setDidSendResetPassword(true);
    } catch (error) {
      setIsSendingResetPassword(false);
      setIsResetPasswordEmailInvalid(true);
      console.error(error);
      console.log("couldn't send email");
    }
  }

  const renderLogin = () => {
    return (
      <>
        <form id="login-form" onSubmit={onSubmitLogin}>
          <label htmlFor="login-email" className="fs-5">Email:</label>
          <input
            id="login-email"
            type="email"
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
            type="text"
            className="form-control"
            value={signupUsername}
            onChange={onChangeSignupUsername}
            placeholder="Billy the Kid"
          />
          <div className="mt-1">
            {!isSignupUsernameValid ? // First, show if username isn't valid
              <p className="text-danger">*Username must be between 3-30 characters</p> :
              <>
                {isCheckingUsernameAvailablility ? // Second, show user mongodb is checking for the username
                  <p className="text-secondary">Checking username availability...</p> :
                  <>
                    {isSignupUsernameAvailable ? // Lastly, after timer is done, show availability
                      <p className="text-success"><i className="bi bi-check-circle"></i> Username is available</p> :
                      <p className="text-danger"><i className="bi bi-x-circle"></i> Username is taken</p>
                    }
                  </>
                }
              </>

            }
          </div>

          <label htmlFor="signup-email" className="fs-5">Email:</label>
          <input
            type="email"
            id="signup-email"
            className="form-control"
            value={signupEmail}
            onChange={onChangeSignupEmail}
            placeholder="test@example.com"
          />
          {!isSignupEmailValid || signupEmail.length === 0 ?
            <p className="text-danger">*Enter a valid email</p> : null
          }
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
          {!isSignupPasswordValid ?
            <p className="text-danger">*Password must have at least 6 characters</p> : null
          }

          <div className="text-center mt-3">
            <button className="btn theme-button fs-4 px-3 button-signup" type="submit" disabled>Sign Up</button>
          </div>
        </form>

        <br />
        <p className="text-center">Already have an account? <a className="" onClick={toggleSignup} type="button" >Login here</a></p>
      </>
    )
  }

  const renderResetPassword = () => {
    return (
      <>
        {didSendResetPassword ?
          <>
            <p>
              Email sent! Please check your inbox.
            </p>
            <div className="text-end">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </> :
          <>
            <label className="modal-title text-center fs-5">Enter your email:</label>

            <form onSubmit={onSubmitResetPassword}>
              <input
                type="email"
                className="form-control"
                value={passwordResetEmail}
                onChange={onChangePasswordResetEmail}
              />

              {isResetPasswordEmailInvalid ? // Text notifying if the email doesn't exist in the Firebase database
                <p className="text-danger">*Email doesn't exist</p> :
                null
              }

              <div className="text-center mt-3">
                <button className="btn button-negative fs-4 px-3" type="submit">Reset Password</button>
              </div>
            </form>
          </>
        }
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

      <div className="alert-modal-error">
        <Alert title={alertTitle} body={alertBody} centered={true} />
      </div>

      <div className="alert-modal-reset-password">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal fade" id="alertModal" tabIndex="-1" aria-labelledby="alertModalLabel" aria-hidden="true">
            <div className={"modal-dialog modal-dialog-centered"}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Password Reset</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body custom-modal-body">
                  {isSendingResetPassword ? // Show user the password reset email is sending.
                    <h4 className="text-center">Sending password reset email...</h4> :
                    renderResetPassword()
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}