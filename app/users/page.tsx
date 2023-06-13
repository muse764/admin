'use client';

import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
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

export default function Users() {
  const [users, setUsers] = useState([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [role, setRole] = useState('');
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
    <div className="App">
      {/* <UpdateModal open={updateModalOpen} close={handleUpdateModalClose} data={popupInfo} /> */}
      <Button onClick={handleCreateModalOpen}>Create</Button>

      <Modal
        open={createModalOpen}
        onClose={handleCreateModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create User
          </Typography>

          <FormControl fullWidth>
            <TextField
              type="text"
              onChange={handleChange}
              label="Full Name"
              id="full_name"
              name="full_name"
              autoComplete="full_name"
              sx={{ m: 1 }}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              type="text"
              onChange={handleChange}
              label="Username"
              id="username"
              name="username"
              autoComplete="username"
              sx={{ m: 1 }}
            />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              type="email"
              label="Email"
              onChange={handleChange}
              id="email"
              name="email"
              autoComplete="email"
              sx={{ m: 1 }}
            />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              type="password"
              label="Password"
              onChange={handleChange}
              id="password"
              name="password"
              autoComplete="password"
              sx={{ m: 1 }}
            />
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="role"
              name="role"
              label="Role"
              sx={{ m: 1 }}
              onChange={handleChange}
            >
              <MenuItem value={'USER'}>user</MenuItem>
              <MenuItem value={'ARTIST'}>artist</MenuItem>
              <MenuItem value={'MODERATOR'}>moderator</MenuItem>
              <MenuItem value={'ADMIN'}>admin</MenuItem>
              <MenuItem value={'SUPERADMIN'}>super admin</MenuItem>
            </Select>
          </FormControl>
          <Button
            type="reset"
            onClick={() => {
              setPopupInfo({
                id: '',
                full_name: '',
                username: '',
                email: '',
                password: '',
                role: '',
              });
              setCreateModalOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button type="submit" onClick={handleCreateSubmit}>
            Create
          </Button>
        </Box>
      </Modal>

      <Modal
        open={updateModalOpen}
        onClose={handleUpdateModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update User
          </Typography>

          <FormControl fullWidth>
            <TextField
              type="text"
              onChange={handleChange}
              label="Full Name"
              value={popupInfo.full_name}
              id="full_name"
              name="full_name"
              autoComplete="full_name"
              sx={{ m: 1 }}
            />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              type="text"
              onChange={handleChange}
              label="Username"
              value={popupInfo.username}
              id="username"
              name="username"
              autoComplete="username"
              sx={{ m: 1 }}
            />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              type="email"
              label="Email"
              onChange={handleChange}
              value={popupInfo.email}
              id="email"
              name="email"
              autoComplete="email"
              sx={{ m: 1 }}
            />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              type="password"
              label="Password"
              onChange={handleChange}
              id="password"
              name="password"
              autoComplete="password"
              sx={{ m: 1 }}
            />
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="role"
              name="role"
              value={popupInfo.role}
              label="Role"
              sx={{ m: 1 }}
              onChange={handleChange}
            >
              <MenuItem value={'USER'}>user</MenuItem>
              <MenuItem value={'ARTIST'}>artist</MenuItem>
              <MenuItem value={'MODERATOR'}>moderator</MenuItem>
              <MenuItem value={'ADMIN'}>admin</MenuItem>
              <MenuItem value={'SUPERADMIN'}>super admin</MenuItem>
            </Select>
          </FormControl>
          <Button
            type="reset"
            onClick={() => {
              setPopupInfo({
                id: '',
                full_name: '',
                username: '',
                email: '',
                password: '',
                role: '',
              });
              setUpdateModalOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button type="submit" onClick={handleUpdateSubmit}>
            Update
          </Button>
        </Box>
      </Modal>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}
