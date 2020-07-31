import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import FetchAuctions from "../Components/FetchAuctions";
import CreateAuctionModal from "../Components/CreateAuctionModal";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  auctionCards: {
    display: "flex",
  },
}));

export default function AuctionsPage() {
  const { isAuthenticated, getIdTokenClaims } = useAuth0();
  const classes = useStyles();

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

  const [token, setToken] = useState();

  return (
    <div>
      <CreateAuctionModal token={token} />
      <div className={classes.auctionCards}>
        <FetchAuctions token={token} />
      </div>
    </div>
  );
}
