
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { Modal } from "bootstrap/dist/js/bootstrap.min.js";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../firebase.js";
import { ADD_USER } from "../utils/mutations.js";
import ROUTES from "../utils/routes.js";
import Alert from "../components/Alert/index.jsx";

export default function Login() {

  let alertTitle = "";
  let alertBody = "";

  const [modalAlert, setModalAlert] = useState(null);
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
  const [passwordResetEmail, setPasswordResetEmail] = useState('');

  const [isResetPasswordEmailInvalid, setIsResetPasswordEmailInvalid] = useState(false);

  const [addUser, { error: addUserError, data: addUserData }] = useMutation(ADD_USER);


  useEffect(() => {
    // Initialize bootstrap modals 
    const modalError = document.querySelector(".alert-modal-error").querySelector("#alertModal");
    setModalAlert(new Modal(modalError));

    const modalResetPass = document.querySelector(".alert-modal-reset-password").querySelector("#alertModal");
    setModalResetPassword(new Modal(modalResetPass));
  }, []);

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
      auth.currentUser.delete(); // Delete the created user if mongodb didn't work
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
          <br />

          <label htmlFor="signup-email" className="fs-5">Email:</label>
          <input
            id="signup-email"
            type="email"
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