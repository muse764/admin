'use client';

import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Card,
  Container,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowsProp,
} from '@mui/x-data-grid';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import Modall from './components/Modall';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [popupInfo, setPopupInfo] = useState({
    id: '',
    full_name: '',
    username: '',
    email: '',
    password: '',
    role: '',
  });

  function retrieveUsers() {
    axios
      .get(`${process.env.API_URL}/users`, {
        headers: {},
        timeout: 1000,
      })
      .then((response) => {
        const users = response.data.users;
        setUsers(users);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    axios
      .get(`${process.env.API_URL}/users`, {
        headers: {},
        timeout: 1000,
      })
      .then((response) => {
        const users = response.data.users;
        setUsers(users);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (event: any) => {
    setPopupInfo({
      ...popupInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdateSubmit = (event: any) => {
    event.preventDefault();
    updateUser();
  };

  const handleCreateSubmit = (event: any) => {
    event.preventDefault();
    createUser();
  };

  function deleteUser(id: string) {
    axios
      .delete(`${process.env.API_URL}/users/${id}`, {
        headers: {},
        timeout: 1000,
      })
      .then((response) => {
        retrieveUsers();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function updateUser() {
    const accessToken = Cookies.get('accessToken');
    axios
      .put(`${process.env.API_URL}/users/${popupInfo.id}`, popupInfo, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        timeout: 1000,
      })
      .then((response) => {
        setPopupInfo({
          id: '',
          full_name: '',
          username: '',
          email: '',
          password: '',
          role: '',
        });
        setUpdateModalOpen(false);
        retrieveUsers();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function createUser() {
    axios
      .post(`${process.env.API_URL}/users`, popupInfo, {
        headers: {},
        timeout: 1000,
      })
      .then((response) => {
        setPopupInfo({
          id: '',
          full_name: '',
          username: '',
          email: '',
          password: '',
          role: '',
        });
        setCreateModalOpen(false);
        retrieveUsers();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleCreateModalOpen = () => setCreateModalOpen(true);
  const handleCreateModalClose = () => setCreateModalOpen(false);

  const handleUpdateModalOpen = (row: any) => {
    setUpdateModalOpen(true);
    setPopupInfo(row);
  };
  const handleUpdateModalClose = () => setUpdateModalOpen(false);

  const columns: GridColDef[] = [
    // { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'full_name', headerName: 'Full Name', flex: 1 },
    { field: 'username', headerName: 'Username', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'role', headerName: 'Role', flex: 1 },
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
            <button onClick={() => deleteUser(params.row.id)}>Delete</button>
          </div>
        );
      },
    },
  ];

  const rows: GridRowsProp = users;

  return (
    <main className="App">
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Users</Typography>
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
              <DataGrid rows={rows} columns={columns} />
            </Card>
          </Stack>
        </Container>
      </Box>

      <Modall
        handleChange={handleChange}
        handleModalClose={handleCreateModalClose}
        handleSubmit={handleCreateSubmit}
        modalOpen={createModalOpen}
        popupInfo={popupInfo}
        submitLabel="Create"
        title="Create User"
      />

      <Modall
        handleChange={handleChange}
        handleModalClose={handleUpdateModalClose}
        handleSubmit={handleUpdateSubmit}
        modalOpen={updateModalOpen}
        popupInfo={popupInfo}
        submitLabel="Update"
        title="Upadte User"
      />
    </main>
  );
}
