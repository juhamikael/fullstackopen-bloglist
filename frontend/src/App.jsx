import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import LandingPage from "./pages/LandingPage";
import FAQ from "./pages/FAQ";
import SingleBlog from "./pages/SingleBlog";
import Home from "./pages/Home";
import Users from "./pages/Users";
import User from "./pages/User";

import Notification from "./components/Notification";
import NavBar from "./components/NavBar";
import { useDispatch } from "react-redux";

import { initializeBlogs } from "./reducers/blogReducer";
import { setupToken } from "./reducers/userReducer";
import { Toaster } from "sonner";

const App = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setupToken());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [user]);

  return (
    <>
      {user.token && <NavBar />}
      <Toaster richColors closeButton theme="dark" />

      <Notification />
      <Routes>
        {!user.token && (
          <>
            <Route path="/" element={<LandingPage />} />
          </>
        )}
        {user.token && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/blogs/:id" element={<SingleBlog />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
