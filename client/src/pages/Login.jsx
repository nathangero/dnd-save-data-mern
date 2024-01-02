/* eslint-disable react/no-unescaped-entities */

import { useEffect, useState } from "react";
import { Modal } from "bootstrap/dist/js/bootstrap.min.js";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../firebase/firebase.js";

import Alert from "../components/Alert/index.jsx";
import Signup from "../components/Signup/index.jsx";
import LoadingSpinner from "../components/LoadingSpinner/index.jsx";
import Logo from "../components/Logo/index.jsx";

const ALERT_TYPE = {
  INVALID_LOGIN: "invalid_login",
  USER_NOT_FOUND: "user_not_found",
  NETWORK_ERROR: "network_error",
}

export default function Login() {

  const [loadingSpinner, setLoadingSpinner] = useState(false);

  const [modalAlert, setModalAlert] = useState(null);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertBody, setAlertBody] = useState('');

  const [modalResetPassword, setModalResetPassword] = useState(null);
  const [didSendResetPassword, setDidSendResetPassword] = useState(false);
  const [isSendingResetPassword, setIsSendingResetPassword] = useState(false); // Shows the user text that the password reset email is sending

  const [showSignup, setSignup] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [passwordResetEmail, setPasswordResetEmail] = useState('');
  const [isResetPasswordEmailInvalid, setIsResetPasswordEmailInvalid] = useState(false);


  useEffect(() => {
    // Initialize bootstrap modals 
    const modalError = document.querySelector(".alert-modal-error").querySelector("#alertModal");
    setModalAlert(new Modal(modalError));

    const modalResetPass = document.querySelector(".alert-modal-reset-password").querySelector("#alertModal");
    setModalResetPassword(new Modal(modalResetPass));

    const loadingSpinner = document.querySelector(".loading-spinner").querySelector("#modal-loading-spinner");
    setLoadingSpinner(new Modal(loadingSpinner));
  }, []);

  const onChangeLoginEmail = ({ target }) => {
    setLoginEmail(target.value);
  }

  const onChangeLoginPassword = ({ target }) => {
    setLoginPassword(target.value);
  }

  const onChangePasswordResetEmail = ({ target }) => {
    setPasswordResetEmail(target.value);
  }

  const toggleLoginPassword = () => {
    setShowLoginPassword(!showLoginPassword);
  }

  const toggleSignup = () => {
    setSignup(!showSignup);
  }

  const toggleLoadingSpinner = () => {
    loadingSpinner.toggle();
  }

  const toggleModalError = (alertType) => {
    switch (alertType) {
      case ALERT_TYPE.INVALID_LOGIN:
        setAlertTitle("Invalid Login");
        setAlertBody("Email or password is invalid. Please check your credentials and try again.");
        break;

      case ALERT_TYPE.NETWORK_ERROR:
        setAlertTitle("Network Error");
        setAlertBody("There was an issue with accessing the network. Please try again.");
        break;

      case ALERT_TYPE.USER_NOT_FOUND:
        setAlertTitle("Invalid Login");
        setAlertBody("This user doesn't exist.");
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
      toggleLoadingSpinner();
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      toggleLoadingSpinner();

      if (!auth.currentUser) throw ("couldn't login");
    } catch (error) {
      console.log("couldn't login");
      console.error(error);
      toggleLoadingSpinner();
      if (error.code === "auth/network-request-failed") {
        toggleModalError(ALERT_TYPE.NETWORK_ERROR);
      } else if (error.code === "auth/user-not-found") {
        toggleModalError(ALERT_TYPE.USER_NOT_FOUND);
      } else {
        toggleModalError(ALERT_TYPE.INVALID_LOGIN);
      }
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
            <button className="btn mx-0" onClick={toggleLoginPassword} type="button" aria-label={showLoginPassword ? "Hide password" : "Show password"}><i className={showLoginPassword ? "bi bi-eye-fill" : "bi bi-eye-slash-fill"}></i></button>
          </div>

          <div className="text-center mt-3">
            <button className="btn theme-button fs-4 px-3" type="submit">Login</button>
          </div>
        </form>

        <br />
        <p className="text-center fs-5">Need an account? <button className="button-link" onClick={toggleSignup} type="button">Sign up here</button></p>
        <p className="text-center fs-5">Forgot your password? <button className="button-link" onClick={toggleModalResetPassword} type="button">Click here</button></p>

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
        <Logo />
        {/* <img src="/icons8-dungeons-and-dragons-48.svg" width={200} height={200} className="img-fluid" alt="dungeons and dragons image provided by icons8"/> */}
        <div className="container-fluid">
          {!showSignup ?
            renderLogin() :
            <>
              <Signup />

              <p className="text-center">Already have an account? <button className="button-link" onClick={toggleSignup} type="button">Login here</button></p>
            </>

          }
        </div>
      </div>

      <div className="alert-modal-error">
        <Alert title={alertTitle} body={alertBody} centered={true} />
      </div>

      <div className="alert-modal-reset-password">
        <div className="modal fade" id="alertModal" tabIndex="-1" aria-labelledby="alertModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
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

      <div className="loading-spinner">
        <LoadingSpinner spinnerText={"Logging in..."} />
      </div>
    </>
  )
}