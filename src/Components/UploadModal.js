import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Modal,
  Backdrop,
  Fade,
  Button,
  Grid,
  TextField,
  IconButton,
} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import DropZone from "./DropZone/DropZone";
import GavelIcon from "@material-ui/icons/Gavel";
import { createAuction } from "../api/APIGateway";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  media: {
    height: 140,
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    position: "relative",
  },
  margin: {
    margin: theme.spacing(5),
  },
  submitBtn: {
    marginTop: "20px",
  },
  imageContainer: {
    width: "300px",
    maxHeight: "300px",
    overflow: "hidden",
    marginBottom: 30,
  },
  img: {
    borderRadius: "3px",
  },
  closeBtn: {
    position: "absolute",
    top: 0,
    right: 0,
  },
}));

export default function UploadModal({ token }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [base64, setBase64] = useState();
  const [title, setTitle] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (!base64 || !token) return;
    createAuction(title, base64, token);
    setOpen(false);
  };

  const handleOnChange = (e) => {
    setTitle(e.target.value);
  };

  const renderButtonAndModal = () => {
    return (
      <>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpen}
          style={{ marginRight: "8px" }}
        >
          Create New Auction
        </Button>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 300,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <IconButton
                aria-label="Close"
                onClick={handleClose}
                className={classes.closeBtn}
              >
                <CancelIcon />
              </IconButton>
              <form
                action="#"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <div className={classes.margin}>
                  <Grid container>
                    <Grid item className={classes.imageContainer}>
                      <DropZone setBase64={setBase64} />
                    </Grid>
                  </Grid>
                  <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                      <GavelIcon />
                    </Grid>
                    <Grid item>
                      <TextField
                        label="Enter an auction name"
                        name="creationDate"
                        placeholder="Enter an auction name"
                        onChange={handleOnChange}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={1}>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={handleSubmit}
                        className={classes.submitBtn}
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              </form>
            </div>
          </Fade>
        </Modal>
      </>
    );
  };

  return <div>{renderButtonAndModal()}</div>;
}
