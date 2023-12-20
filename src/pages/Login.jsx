
import { useState } from "react";
import { Modal } from "bootstrap/dist/js/bootstrap.min.js";

export default function Login() {

  const [showSignup, setSignup] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

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

  const onSubmitForm = (e) => {
    e.preventDefault();


  }

  const renderLogin = () => {
    return (
      <>
        <form id="login-form" onSubmit={onSubmitForm}>
          <label htmlFor="login-email">Email:</label>
          <input
            id="login-email"
            className="form-control"
            value={loginEmail}
            onChange={onChangeLoginEmail}
            placeholder="test@example.com"
          />

          <p htmlFor="login-password" className="mb-0">Password:</p>
          <div className="container-fluid d-inline-flex border rounded px-0">
            <input
              id="login-password"
              type={showLoginPassword ? "text" : "password"}
              className="form-control border-0"
              value={loginPassword}
              onChange={onChangeLoginPassword}
              placeholder="******"
            />
            <button className="btn mx-0" onClick={toggleLoginPassword}><i className={showLoginPassword ? "bi bi-eye-fill" : "bi bi-eye-slash-fill"}></i></button>
          </div>
        </form>
        
        <br />
        <p className="text-center">Need an account? <a className="" onClick={toggleSignup}>Signup here</a></p>
        <p className="text-center">Forgot your password? <a className="" onClick={toggleModalResetPassword}>Click here</a></p>
      </>
    )
  }

  const renderSignup = () => {
    return (
      <>
        <form id="signup-form" className="" onSubmit={onSubmitForm}>
          <label htmlFor="signup-username">Username:</label>
          <input
            id="signup-username"
            className="form-control"
            value={signupUsername}
            onChange={onChangeSignupUsername}
            placeholder="Billy the Kid"
          />

          <label htmlFor="signup-email">Email:</label>
          <input
            id="signup-email"
            className="form-control"
            value={signupEmail}
            onChange={onChangeSignupEmail}
            placeholder="test@example.com"
          />

          <p htmlFor="signup-password" className="mb-0">Password:</p>
          <div className="container-fluid d-inline-flex border rounded px-0">
            <input
              id="signup-password"
              type={showSignupPassword ? "text" : "password"}
              className="form-control border-0"
              value={signupPassword}
              onChange={onChangeSignupPassword}
              placeholder="******"
            />
            <button className="btn mx-0" onClick={toggleSignupPassword}><i className={showSignupPassword ? "bi bi-eye-fill" : "bi bi-eye-slash-fill"}></i></button>
          </div>
        </form>

        <br />
        <p className="text-center">Already have an account? <a className="" onClick={toggleSignup}>Login here</a></p>
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