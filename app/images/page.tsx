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
import Cookies from 'js-cookie';
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
import Image from 'next/image';
import Modall from './components/Modall';

export default function Images() {
  const [images, setImages] = useState([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [popupInfo, setPopupInfo] = useState({
    file: '',
  });

  function retrieveImages() {
    axios
      .get(`${process.env.API_URL}/images`, {
        headers: {},
        timeout: 1000,
      })
      .then((response) => {
        const images = response.data.images;
        setImages(images);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    retrieveImages();
  }, []);

  const rows: GridRowsProp = images;

  const columns: GridColDef[] = [
    // { field: 'id', headerName: 'ID', flex: 1 },
    {
      field: 'file',
      headerName: 'File',
      flex: 1,
      renderCell: (params) => (
        <Image
          src={`data:image/png;base64,${params.row.file}`}
          alt="image"
          width={50}
          height={50}
        />
      ),
    },
    { field: 'width', headerName: 'Width', flex: 1 },
    { field: 'height', headerName: 'Height', flex: 1 },
    { field: 'userId', headerName: 'User', flex: 1 },
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

  const handleChange = (event: any) => {
    setPopupInfo({
      ...popupInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdateSubmit = (event: any) => {
    event.preventDefault();
    // updateImage();
  };

  const handleCreateSubmit = (event: any) => {
    event.preventDefault();
    createImage();
  };

  // function deleteImage(id: string) {
  //   axios
  //     .delete(`${process.env.API_URL}/images/${id}`, {
  //       headers: {},
  //       timeout: 1000,
  //     })
  //     .then((response) => {
  //       retrieveImages();
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  // function updateImage() {
  //   axios
  //     .put(`${process.env.API_URL}/images/${popupInfo.id}`, popupInfo, {
  //       headers: {},
  //       timeout: 1000,
  //     })
  //     .then((response) => {
  //       setPopupInfo({
  //         file: "",
  //       });
  //       setUpdateModalOpen(false);
  //       retrieveImages();
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  function createImage() {
    const accessToken = Cookies.get('accessToken');
    axios
      .post(`${process.env.API_URL}/images`, popupInfo, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        timeout: 1000,
      })
      .then((response) => {
        setPopupInfo({
          file: '',
        });
        setCreateModalOpen(false);
        retrieveImages();
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
                <Typography variant="h4">Images</Typography>
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
