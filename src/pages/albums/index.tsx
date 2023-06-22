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

export default function AlbumsPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [albums, setAlbums] = useState([]);

  const handlePageChange = (event: any, value: any) => {
    setPage(value);
  };

  const handleRowsPerPageChange = (event: any) => {
    setRowsPerPage(event.target.value);
  };

  const api_url = import.meta.env.VITE_API_URL;

  function retrieveAlbums() {
    axios
      .get(`${api_url}/albums?limit=${rowsPerPage}&offset=${page}`)
      .then((res) => {
        const albums = res.data.albums;
        setAlbums(albums);
      });
  }

  useEffect(() => {
    retrieveAlbums();
  }, []);

  return (
    <div>
      <h1>Albums</h1>
      <Card>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Release Date</TableCell>
                <TableCell>Album Type</TableCell>
                <TableCell>Artists</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {albums.map((album: any) => (
                <TableRow>
                  <TableCell>{album.name}</TableCell>
                  <TableCell>{album.release_date}</TableCell>
                  <TableCell>{album.type}</TableCell>
                  <TableCell>
                    {album.artists
                      .map((artist: any) => artist.full_name)
                      .join(", ")}
                  </TableCell>
                  <TableCell>
                    <Stack direction={"row"} gap={2}>
                      <IconButton>
                        <NavLink to={`/album/${album.id}`}>
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
          count={albums.length}
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
