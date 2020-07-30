import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import FetchAuctions from "../Components/FetchAuctions";
import UploadModal from "../Components/UploadModal";

export default function AuctionsPage() {
  const { isAuthenticated, getIdTokenClaims } = useAuth0();

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
      <UploadModal token={token} />
      <FetchAuctions token={token} />
    </div>
  );
}
