import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "@/services/users";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    const getUsers = async () => {
      const users = await userService.getAll();
      setUsers(users);
    };
    getUsers();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="w-1/2">
        {users.length > 0 && (
          <Table className="rounded-xl">
            <TableCaption>List of Users</TableCaption>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[50%] text-center">Name</TableHead>
                <TableHead className="w-[50%] text-center">
                  Blogs Created
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  className="cursor-pointer hover:bg-primary/80 "
                  key={user.id}
                  onClick={() => navigate(user.id)}
                >
                  <TableCell className="w-[50%] text-center">
                    {user.name}
                  </TableCell>
                  <TableCell className="w-[50%] text-center">
                    {user.blogs.length}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default Users;
