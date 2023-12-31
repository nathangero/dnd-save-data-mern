/* eslint-disable react/no-unescaped-entities */

import { useLazyQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { Modal } from "bootstrap/dist/js/bootstrap.min.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../firebase.js";
import { CHECK_USER } from "../../utils/queries.js";
import { ADD_USER } from "../../utils/mutations.js";

import ROUTES from "../../utils/routes.js";
import Alert from "../Alert/index.jsx";

const ALERT_TYPE = {
  INVALID_SIGNUP_USERNAME: "invalid_signup_username",
  INVALID_SIGNUP_EMAIL: "invalid_signup_email",
}

export default function Signup() {

  const [modalAlert, setModalAlert] = useState(null);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertBody, setAlertBody] = useState('');

  const [showSignupPassword, setShowSignupPassword] = useState(false);

  const [signupUsername, setSignupUsername] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const [isSignupUsernameValid, setIsSignupUsernameValid] = useState(false);
  const [isCheckingUsernameAvailablility, setIsCheckingUsernameAvailablility] = useState(false);
  const [isSignupUsernameAvailable, setIsSignupUsernameAvailable] = useState(false);
  const [isSignupEmailValid, setIsSignupEmailValid] = useState(false);
  const [isSignupPasswordValid, setIsSignupPasswordValid] = useState(false);

  const [timeoutId, setTimeoutId] = useState(null);

  const [addUser] = useMutation(ADD_USER);
  const [checkUser] = useLazyQuery(CHECK_USER);

  useEffect(() => {
    // Initialize bootstrap modals 
    const modalError = document.querySelector(".alert-modal-error").querySelector("#alertModal");
    setModalAlert(new Modal(modalError));
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

  const toggleSignupPassword = () => {
    setShowSignupPassword(!showSignupPassword);
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
          <p className="text-danger">*Enter a valid email</p> : <br />
        }

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
      

      <div className="alert-modal-error">
        <Alert title={alertTitle} body={alertBody} centered={true} />
      </div>
    </>
  )
}