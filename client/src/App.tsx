import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { isShowingNavbarSelector } from "./components/navbar/showNavbarSlice";
import { updateUser } from "./features/user/userSlice";
import "./styles/app.scss";
import { Page404 } from "./features/404/404";
import { Register } from "./features/register/Register";
import { Login } from "./features/login/Login";
import { Home } from "./features/home/Home";
import { Navbar } from "./components/navbar/Navbar";
import { Footer } from "./components/footer/Footer";
import { Single } from "./features/single/Single";
import { Write } from "./features/write/Write";
import axios from "axios";


function App() {
  const navbarSelector = useAppSelector(isShowingNavbarSelector);
  const dispatch = useAppDispatch();

  async function getUserByCookie() {
    try {
      const { data } = await axios.get("/auth/user-by-cookie");     
      const { userCookie, decodedCookie } = data;
      if (!userCookie || !decodedCookie) throw new Error("userCookie not found");
      // console.log("This decodedCookie from getUserByCookie:", data.decodedCookie.username); 
      dispatch(updateUser(data.decodedCookie)); 
     
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getUserByCookie();
  }, []);


  return (
    <div className="App">
      <div className="container">
        <BrowserRouter>
          {navbarSelector && (
            <nav>
              <Navbar />
            </nav>
          )}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:id" element={<Single />} />
            <Route path="/write" element={<Write />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
          {navbarSelector && (
            <nav>
              <Footer />
            </nav>
          )}
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
