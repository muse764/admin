import { Route, Routes } from "react-router-dom";
import {
  AlbumPage,
  AlbumsPage,
  ArtistPage,
  ArtistsPage,
  CategoriesPage,
  DashboardPage,
  GenresPage,
  LoginPage,
  NotFoundPage,
  PlaylistPage,
  PlaylistsPage,
  TrackPage,
  TracksPage,
  UserPage,
  UsersPage,
} from "../pages";

function Router() {
  return (
    <Routes>
      <Route index element={<DashboardPage />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/albums" element={<AlbumsPage />} />
      <Route path="/album/:id" element={<AlbumPage />} />
      <Route path="/artists" element={<ArtistsPage />} />
      <Route path="/artist/:id" element={<ArtistPage />} />
      <Route path="/categories" element={<CategoriesPage />} />
      <Route path="/genres" element={<GenresPage />} />
      <Route path="/playlists" element={<PlaylistsPage />} />
      <Route path="/playlist/:id" element={<PlaylistPage />} />
      <Route path="/tracks" element={<TracksPage />} />
      <Route path="/track/:id" element={<TrackPage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/user/:id" element={<UserPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default Router;
