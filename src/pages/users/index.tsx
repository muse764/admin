import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import ListAltIcon from "@mui/icons-material/ListAlt";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { NavLink } from "react-router-dom";

export default function UsersPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [users, setUsers] = useState([]);

  const handlePageChange = (event: any, value: any) => {
    setPage(value);
  };

  const handleRowsPerPageChange = (event: any) => {
    setRowsPerPage(event.target.value);
  };

  const api_url = import.meta.env.VITE_API_URL;

  function retrieveusers() {
    axios
      .get(`${api_url}/users?limit=${rowsPerPage}&offset=${page}`)
      .then((res) => {
        const users = res.data.users;
        setUsers(users);
      });
  }

  useEffect(() => {
    retrieveusers();
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <Card>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user: any) => (
                <TableRow>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>
                    <Stack direction={"row"} gap={2}>
                      <IconButton>
                        <NavLink to={`/user/${user.id}`}>
                          <ListAltIcon />
                        </NavLink>
                      </IconButton>
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                      <IconButton>
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
        <TablePagination
          component="div"
          count={users.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
    </div>
  );
}
