import React from "react";
import { fetchAuctions } from "../api/APIGateway";
import AuctionCard from "./AuctionCard";

export default function FetchAuctions({ token }) {
  const [auctionsToRender, setAuctionsToRender] = React.useState(null);

  React.useEffect(() => {
    const fetchAuctionsWithToken = async () => {
      if (token) {
        const auctionsPromise = await fetchAuctions(token);

        const auctions = await auctionsPromise;
        setAuctionsToRender(auctions);
      }
    };
    fetchAuctionsWithToken();
  }, [token]);

  const renderAuctions = () => {
    return auctionsToRender.map((auction) => {
      return <AuctionCard key={auction.id} auctionToRender={auction} />;
    });
  };

  return <>{auctionsToRender && renderAuctions()}</>;
}
