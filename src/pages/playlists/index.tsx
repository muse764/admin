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

export default function PlaylistsPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [playlists, setPlaylists] = useState([]);

  const handlePageChange = (event: any, value: any) => {
    setPage(value);
  };

  const handleRowsPerPageChange = (event: any) => {
    setRowsPerPage(event.target.value);
  };

  const api_url = import.meta.env.VITE_API_URL;

  function retrievePlaylist() {
    axios
      .get(`${api_url}/playlists?limit=${rowsPerPage}&offset=${page}`)
      .then((res) => {
        const playlists = res.data.playlists;
        setPlaylists(playlists);
      });
  }

  useEffect(() => {
    retrievePlaylist();
  }, []);

  return (
    <div>
      <h1>Playlists</h1>
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
              {playlists.map((playlist: any) => (
                <TableRow>
                  <TableCell>{playlist.name}</TableCell>
                  <TableCell>
                    <Stack direction={"row"} gap={2}>
                      <IconButton>
                        <NavLink to={`/playlist/${playlist.id}`}>
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
          count={playlists.length}
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
