'use client';

import { Box, Container, Grid } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Cardss from './components/cardss';

export default function Home() {
  const [stats, setStats] = useState({
    albums: 0,
    artists: 0,
    genres: 0,
    images: 0,
    playlists: 0,
    tracks: 0,
    users: 0,
  });
  useEffect(() => {
    axios
      .get(`${process.env.API_URL}/stats`, {})
      .then((response) => {
        const stats = response.data;
        setStats(stats);
      })
      .catch((error) => {});
  }, []);

  return (
    <main>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid xs={12} sm={6} lg={3}>
              <Cardss
                sx={{ height: '100%' }}
                title="Albums"
                value={stats.albums}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <Cardss
                sx={{ height: '100%' }}
                title="Artists"
                value={stats.artists}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <Cardss
                sx={{ height: '100%' }}
                title="Genres"
                value={stats.genres}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <Cardss
                sx={{ height: '100%' }}
                title="Images"
                value={stats.images}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <Cardss
                sx={{ height: '100%' }}
                title="Playlists"
                value={stats.playlists}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <Cardss
                sx={{ height: '100%' }}
                title="Users"
                value={stats.users}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <Cardss
                sx={{ height: '100%' }}
                title="Tracks"
                value={stats.tracks}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </main>
  );
}
