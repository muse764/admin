import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  Container,
  IconButton,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import ListAltIcon from "@mui/icons-material/ListAlt";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { NavLink } from "react-router-dom";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import GenreModal from "./components/GenreModal";
import { useFormik } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";

export default function GenresPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [genres, setGenres] = useState([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const handleCreateModalOpen = () => setCreateModalOpen(true);
  const handleCreateModalClose = () => setCreateModalOpen(false);

  const handlePageChange = (event: any, value: any) => {
    setPage(value);
  };

  const handleRowsPerPageChange = (event: any) => {
    setRowsPerPage(event.target.value);
  };

  const api_url = import.meta.env.VITE_API_URL;

  function retrieveGenres() {
    axios
      .get(`${api_url}/genres?limit=${rowsPerPage}&offset=${page}`)
      .then((res) => {
        const genres = res.data.genres;
        setGenres(genres);
      });
  }

  const createGenreFormik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      axios
        .post(`${api_url}/genres`, values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        })
        .then((res) => {
          retrieveGenres();
          handleCreateModalClose();
        });
    },
  });

  useEffect(() => {
    retrieveGenres();
  }, []);

  return (
    <>
      <Container maxWidth="xl">
        <Stack spacing={3}>
          <Stack direction="row" justifyContent="space-between" spacing={4}>
            <Stack spacing={1}>
              <Typography variant="h4">Genres</Typography>
            </Stack>
            <div>
              <Button
                startIcon={
                  <SvgIcon fontSize="small">
                    <PlusIcon />
                  </SvgIcon>
                }
                onClick={handleCreateModalOpen}
                variant="contained"
              >
                Add
              </Button>
            </div>
          </Stack>
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
                  {genres.map((genre: any) => (
                    <TableRow>
                      <TableCell>{genre.name}</TableCell>
                      <TableCell>
                        <Stack direction={"row"} gap={2}>
                          <IconButton>
                            <NavLink to={`/genre/${genre.id}`}>
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
              count={genres.length}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </Card>
        </Stack>

        <GenreModal
          actionTitle="Create"
          title="Create Genre"
          open={createModalOpen}
          handleClose={handleCreateModalClose}
          formik={createGenreFormik}
        />
      </Container>
    </>
  );
}
