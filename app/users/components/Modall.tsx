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

export default function Modall({
  title,
  modalOpen,
  handleModalClose,
  handleChange,
  handleSubmit,
  submitLabel,
  popupInfo,
}: {
  title: string;
  modalOpen: any;
  handleModalClose: any;
  handleChange: any;
  handleSubmit: any;
  submitLabel: string;
  popupInfo: any;
}) {
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
    <Modal
      open={modalOpen}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
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
        <Button type="reset">Cancel</Button>
        <Button type="submit" onClick={handleSubmit}>
          {submitLabel}
        </Button>
      </Box>
    </Modal>
  );
}
