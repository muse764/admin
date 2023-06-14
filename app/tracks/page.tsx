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

export default function Tracks() {
  const [tracks, setTracks] = useState([]);

  function retrieveTracks() {
    axios
      .get(`${process.env.API_URL}/tracks`, {
        headers: {},
        timeout: 1000,
      })
      .then((response) => {
        const tracks = response.data.tracks;
        setTracks(tracks);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    retrieveTracks();
  }, []);

  const columns: GridColDef[] = [
    // { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 1 },
    // { field: 'role', headerName: 'Role', flex: 1 },
    {
      field: 'published',
      headerName: 'Published',
      flex: 1,
      renderCell: (params: GridRenderCellParams<any>) => {
        if (params.row.published) {
          return <CheckIcon />;
        } else {
          return <CloseIcon />;
        }
      },
    },
  ];

  const rows: GridRowsProp = tracks;

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
                <Typography variant="h4">Tracks</Typography>
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
