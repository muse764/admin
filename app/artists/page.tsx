'use client';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowsProp,
} from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect, useState } from 'react';

import {
  Box,
  Button,
  Card,
  Container,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/material';

export default function Artists() {
  const [artists, setArtists] = useState([]);

  function retrieveArtists() {
    axios
      .get(`${process.env.API_URL}/artists`, {
        headers: {},
        timeout: 1000,
      })
      .then((response) => {
        const artists = response.data.artists;
        setArtists(artists);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    retrieveArtists();
  }, []);

  const columns: GridColDef[] = [
    // { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'full_name', headerName: 'Full Name', flex: 1 },
    { field: 'username', headerName: 'Username', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    // { field: 'role', headerName: 'Role', flex: 1 },
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
  ];

  const rows: GridRowsProp = artists;

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
                <Typography variant="h4">Artists</Typography>
              </Stack>
              <div>
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
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
    </main>
  );
}
