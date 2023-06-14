import {
  Box,
  Button,
  FormControl,
  Input,
  Modal,
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

  const handleImage = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      handleChange({ target: { name: 'file', value: reader.result } });
    };
    reader.readAsDataURL(file);
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
          <Input onChange={handleImage} type="file" id="file" name="file" />
        </FormControl>
        <Button type="reset">Cancel</Button>
        <Button type="submit" onClick={handleSubmit}>
          {submitLabel}
        </Button>
      </Box>
    </Modal>
  );
}
