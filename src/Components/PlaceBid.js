import React, { useState, useEffect } from "react";
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
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { useAuth0 } from "@auth0/auth0-react";
import { placeBid } from "../api/APIGateway";

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

export default function PlaceBid({ auctionToRender }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated, getIdTokenClaims } = useAuth0();
  const [isOwner, setIsOwner] = useState(false);
  const [token, setToken] = useState();

  useEffect(() => {
    const getToken = async () => {
      if (isAuthenticated) {
        const tokenClaims = await getIdTokenClaims();
        const token = tokenClaims.__raw;
        setToken(token);
      }
    };

    getToken();
  }, [isAuthenticated, getIdTokenClaims]);

  const {
    createdAt,
    endingAt,
    highestBid,
    id,
    seller,
    pictureUrl,
    status,
    title,
  } = auctionToRender;

  const [bidAmount, setBidAmount] = useState(highestBid.amount + 1);

  React.useEffect(() => {
    if (seller === user.email) {
      setIsOwner(true);
    }
  }, [seller, user]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    placeBid(id, bidAmount, token);

    setOpen(false);
  };

  const handleOnChange = (e) => {
    setBidAmount(e.target.value);
  };

  const renderButtonAndModal = () => {
    return (
      <>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpen}
          style={{ marginRight: "8px" }}
          disabled={isOwner}
        >
          {isOwner ? "Can't Bid on own item" : "Place Bid"}
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
                      <img
                        style={{
                          width: "100%",
                          objectFit: "cover",
                        }}
                        src={pictureUrl}
                        alt={title}
                        className={classes.img}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                      <AttachMoneyIcon />
                    </Grid>
                    <Grid item>
                      <TextField
                        label="Edit Bid Amount"
                        name="bidAmount"
                        type="number"
                        // Default bid value
                        defaultValue={highestBid.amount + 1}
                        onChange={handleOnChange}
                        inputProps={{ min: highestBid.amount + 1 }}
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

  return <div>{id && renderButtonAndModal()}</div>;
}
