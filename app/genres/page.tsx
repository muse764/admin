'use client';

import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowsProp,
} from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Modall from './components/Modall';

export default function Genres() {
  const [genres, setGenres] = useState([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [popupInfo, setPopupInfo] = useState({
    id: '',
    name: '',
    active: false,
  });

  const handleChange = (event: any) => {
    setPopupInfo({
      ...popupInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handleCreateSubmit = (event: any) => {
    event.preventDefault();
    createGenre();
  };

  const handleUpdateSubmit = (event: any) => {
    event.preventDefault();
    updateGenre();
  };

  function createGenre() {
    axios
      .post(`${process.env.API_URL}/genres`, popupInfo, {
        headers: {},
        timeout: 1000,
      })
      .then((response) => {
        setPopupInfo({
          id: '',
          name: '',
          active: false,
        });
        setCreateModalOpen(false);
        retrieveGenres();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function retrieveGenres() {
    axios
      .get(`${process.env.API_URL}/genres`, {
        headers: {},
        timeout: 1000,
      })
      .then((response) => {
        const genres = response.data.genres;
        setGenres(genres);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    axios
      .get(`${process.env.API_URL}/genres`, {
        headers: {},
        timeout: 1000,
      })
      .then((response) => {
        const genres = response.data.genres;
        setGenres(genres);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function deleteGenre(id: string) {
    axios
      .delete(`${process.env.API_URL}/genres/${id}`, {
        headers: {},
        timeout: 1000,
      })
      .then((response) => {
        retrieveGenres();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function updateGenre() {
    axios
      .put(`${process.env.API_URL}/genres/${popupInfo.id}`, popupInfo, {
        headers: {},
        timeout: 1000,
      })
      .then((response) => {
        setPopupInfo({
          id: '',
          name: '',
          active: false,
        });
        setUpdateModalOpen(false);
        retrieveGenres();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 1 },
    {
      field: 'active',
      headerName: 'Active',
      flex: 1,
      renderCell: (params: GridRenderCellParams<any>) => {
        if (params.row.active) {
          return <CheckIcon />;
        } else {
          return <CloseIcon />;
        }
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params: GridRenderCellParams<any>) => {
        return (
          <div>
            <button onClick={() => handleUpdateModalOpen(params.row)}>
              Update
            </button>
            <button onClick={() => deleteGenre(params.row.id)}>Delete</button>
          </div>
        );
      },
    },
  ];

  const rows: GridRowsProp = genres;

  const handleCreateModalOpen = () => setCreateModalOpen(true);
  const handleCreateModalClose = () => setCreateModalOpen(false);

  const handleUpdateModalOpen = (row: any) => {
    setUpdateModalOpen(true);
    setPopupInfo(row);
  };
  const handleUpdateModalClose = () => setUpdateModalOpen(false);

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <main>
      <h1>Genres</h1>
      <Button onClick={handleCreateModalOpen}>Create</Button>

      <Modall
        title="Create Genre"
        modalOpen={createModalOpen}
        handleChange={handleChange}
        handleModalClose={handleCreateModalClose}
        handleSubmit={handleCreateSubmit}
        submitLabel="Create"
        popupInfo={popupInfo}
      />

      <Modall
        title="Update Genre"
        modalOpen={updateModalOpen}
        handleChange={handleChange}
        handleModalClose={handleUpdateModalClose}
        handleSubmit={handleUpdateSubmit}
        submitLabel="Update"
        popupInfo={popupInfo}
      />

      <DataGrid rows={rows} columns={columns} />
    </main>
  );
}
