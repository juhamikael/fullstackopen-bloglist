import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";

import { getUserIdFromToken } from "../lib/tokenUtils";

import NewBlog from "./NewBlog";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/userReducer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
const NavBar = () => {
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    navigation("/");
  };

  const links = [
    { name: "Home", path: "/" },
    { name: "Users", path: "/users" },
    { name: "FAQ", path: "/faq" },
  ];

  return (
    <>
      <div className="flex justify-center flex-col lg:flex-row items-center">
        <div className="flex gap-x-4 py-4 items-center ">
          {links.map((link) => (
            <Link
              className={`text-accent ${
                location.pathname === link.path &&
                "font-bold text-xl transition-all duration-50 ease-in-out"
              } antialiased `}
              key={link.name}
              to={link.path}
            >
              {link.name}
            </Link>
          ))}
          <Dialog>
            <DialogTrigger id="new-blog-trigger">New Blog</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a new blog</DialogTitle>
                <DialogDescription className={cn("text-accent/80 pb-4")}>
                  In order to create a new blog, you must fill out the form
                  below.
                </DialogDescription>
                <NewBlog />
              </DialogHeader>
            </DialogContent>

          </Dialog>
        </div>
        <div className="flex gap-x-4 items-center lg:absolute lg:right-0 lg:px-8">
          <div className="flex items-center gap-x-2">
            <span
              id="logged-in-user-name"
              onClick={() =>
                navigation(`/users/${getUserIdFromToken(user.token)}`)
              }
              className="font-bold text-primary text-2xl cursor-pointer hover:text-primary/80 transition-all duration-50 ease-in-out  "
            >
              {user.name}
            </span>
            <span>logged in</span>
          </div>
          <Button id="logout-btn" onClick={logoutHandler}>
            Log Out
          </Button>
        </div>
      </div>
    </>
  );
};

export default NavBar;
