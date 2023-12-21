
import './App.css';
import { Outlet } from "react-router";
import Nav from "./components/Navbar";
import StoreProvider from "./redux/GlobalState";


function App() {
  return (
    <>
      <StoreProvider>
        <Nav />
        <main>
          <Outlet />
        </main>
      </StoreProvider>
    </>
  )
}

export default App
