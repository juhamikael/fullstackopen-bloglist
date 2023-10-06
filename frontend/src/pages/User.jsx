import userService from "../services/users";
import accountService from "../services/account";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { logout } from "../reducers/userReducer";
import { showNotification } from "../reducers/notificationReducer";

import { cn } from "../lib/utils";
import { parsePath } from "../lib/utils";
import { calculateTimeSince } from "../lib/time";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

import { Button, buttonVariants } from "../components/ui/button";

const User = () => {
  const [currentUser, setCurrentUser] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    const getUsers = async () => {
      const user = await userService.getById(parsePath(location.pathname));
      setCurrentUser(user);
    };
    getUsers();
  }, [blogs]);

  if (!currentUser) {
    return null;
  }

  const confirmDelete = async () => {
    try {
      await accountService.deleteAccount(currentUser.id);
      dispatch(logout());
      navigate("/");
      dispatch(
        showNotification(
          `Account & Blog posts deleted successfully, hope to see you again soon! `,
          5,
          "success"
        )
      );
    } catch (error) {
      dispatch(
        showNotification(
          `Error deleting account: ${error.response.data.error}`,
          5,
          "error"
        )
      );
      throw new Error("An error occurred while deleting account:", error);
    }
  };

  const tokenExpires = new Date(currentUser.tokenExpires);
  const lastSeen = new Date(tokenExpires.getTime() - 60 * 60 * 1000);

  return (
    <div className="pt-10">
      <div className="flex justify-center pb-10 text-4xl lg:text-7xl font-bold">
        User Dashboard
      </div>
      <div className="flex flex-col lg:flex-row justify-center gap-x-10 px-4 gap-y-8 lg:gap-y-0 lg:px-24">
        <Card
          className={cn(
            "bg-transparent text-accent w-full lg:w-fit border border-accent/5 h-fit"
          )}
        >
          <CardHeader className="flex flex-row justify-between">
            <div className="flex flex-col">
              <CardTitle>User name: {currentUser.username}</CardTitle>
              <CardDescription>
                Last Login: {calculateTimeSince(lastSeen)}
              </CardDescription>
              <CardDescription className={cn("text-xs")}>
                ID: {currentUser.id}
              </CardDescription>
            </div>
            <div>
              {user.name === currentUser.name && (
                <>
                  <AlertDialog>
                    <AlertDialogTrigger
                      as={Button}
                      id="delete-btn"
                      className={cn(
                        buttonVariants({ variant: "destructive" }),
                        "px-0 md:px-2 md:mx-6"
                      )}
                    >
                      Remove
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete your account.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel
                          onClick={() => setIsDialogOpen(false)}
                        >
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDelete}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </>
              )}
            </div>
          </CardHeader>
          <CardContent className="flex flex-row justify-around gap-x-2">
            <div>
              <p className="font-bold">Name</p>
              <p className="text-center">{currentUser.name}</p>
            </div>

            <div>
              <p className="font-bold">Total Blogs</p>
              <p className="text-center">{currentUser.blogs.length}</p>
            </div>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
        {currentUser.blogs.length > 0 ? (
          <Card
            className={cn(
              "bg-transparent text-accent lg:w-1/2 border border-accent/5"
            )}
          >
            <CardHeader>
              <p className="font-black text-2xl">Added blogs</p>
            </CardHeader>
            <Table>
              <TableCaption>A list of blogs created by user</TableCaption>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead className="text-center">Comments</TableHead>
                  <TableHead className="text-center">Likes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentUser.blogs.map((blog) => (
                  <TableRow
                    key={blog.id}
                    className="hover:bg-primary/80 cursor-pointer"
                    onClick={() => navigate(`/blogs/${blog.id}`)}
                  >
                    <TableCell className="font-medium">{blog.id}</TableCell>
                    <TableCell>{blog.title}</TableCell>
                    <TableCell>{blog.author}</TableCell>
                    <TableCell className="text-center">
                      {blog.comments.length}
                    </TableCell>
                    <TableCell className="text-center">{blog.likes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        ) : (
          <Card
            className={cn(
              "bg-transparent text-accent w-1/2 border border-accent/5"
            )}
          >
            <CardHeader>
              <p className="font-black text-2xl">Created blogs</p>
            </CardHeader>
            <CardContent
              className={cn("flex justify-center items-center text-3xl")}
            >
              <div>No blogs created</div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default User;
