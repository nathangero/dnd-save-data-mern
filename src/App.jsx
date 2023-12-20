
import './App.css';
import { Outlet } from "react-router";
import Nav from "./components/Navbar";


function App() {
  return (
    <>
      <Nav />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default App
