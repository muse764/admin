import {
  Box,
  Button,
  Container,
  Modal,
  TextField,
  Typography,
} from "@mui/material";

export default function GenreModal({
  open,
  handleClose,
  formik,
  title,
  actionTitle,
}: {
  open: any;
  handleClose: any;
  formik: any;
  title: string;
  actionTitle: string;
}) {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Container component="main" maxWidth="sm">
        <Box sx={style}>
          <Typography component="h1" variant="h5">
            {title}
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              error={!!(formik.touched.name && formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {actionTitle}
            </Button>
            {formik.errors.submit && (
              <Typography color="error">{formik.errors.submit}</Typography>
            )}
          </Box>
        </Box>
      </Container>
    </Modal>
  );
}
