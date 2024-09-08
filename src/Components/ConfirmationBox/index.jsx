import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Box,
  makeStyles,
  Typography,
} from "@material-ui/core";
import "./styles.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmationModal({ open, setOpen, onDelete }) {
  const classes = useStyles();
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    onDelete();
  };

  return (
    <Box>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        className={classes.confirmationBox}
      >
        <DialogTitle
          id="alert-dialog-slide-title"
          className={classes.confirmationTitle}
        >
          <Typography variant="h4">Are you sure you want to delete?</Typography>
          {/* {" Are you sure you want to delete?"} */}
        </DialogTitle>

        <DialogContent></DialogContent>

        <DialogActions>
          <Button
            onClick={handleClose}
            color="primary"
            className={classes.confirmationButtonCancel}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            variant="contained"
            color="secondary"
            className={classes.confirmationButtonDelete}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

const useStyles = makeStyles(() => ({
  confirmationTitle: {
    marginTop: "5%",
    fontSize: "2rem !important",
  },
  confirmationButtonCancel: {
    width: "25%",
    height: "3rem",
    border: "2px solid #b6b6b8",
    borderRadius: "12px",
    marginBottom: "2rem",
    fontSize: "1.2rem",
    color: "black",
  },
  confirmationButtonDelete: {
    width: "25%",
    height: "3rem",
    marginRight: "25px",
    marginBottom: "2rem",
    borderRadius: "12px",
    fontSize: "1.2rem",
    backgroundColor: "#ff3500",
  },
}));
