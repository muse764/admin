import {
  Box,
  Button,
  FormControl,
  Modal,
  Switch,
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
            label="Name"
            id="name"
            name="name"
            autoComplete="name"
            value={popupInfo.name}
            sx={{ m: 1 }}
          />
        </FormControl>
        <FormControl fullWidth>
          <Switch
            onChange={handleChange}
            aria-label="Active"
            id="active"
            name="active"
            value={popupInfo.active}
          />
        </FormControl>
        <Button type="reset">Cancel</Button>
        <Button type="submit" onClick={handleSubmit}>
          {submitLabel}
        </Button>
      </Box>
    </Modal>
  );
}
