import Axios from "axios";

const axios = Axios.create({
  baseURL: process.env.REACT_APP_AUCTIONS_ENDPOINT,
});

export const fetchAuctions = async (token) => {
  try {
    const result = await axios.get("/auctions?status=OPEN", {
      headers: {
        Authorization: token,
      },
    });

    return result.data;
  } catch (error) {
    alert("Could not fetch auctions! Check console for more details.");
    console.error(error);
  }
};

export const createAuction = async (title, pictureBase64, token) => {
  let auctionId;

  try {
    const createAuctionResult = await axios.post(
      "/auction",
      { title },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    const auction = createAuctionResult.data;
    auctionId = auction.id;

    await axios.patch(`/auction/${auctionId}/picture`, pictureBase64, {
      headers: {
        Authorization: token,
      },
    });
  } catch (error) {
    alert("Could not create auction! Check console for more details.");
    console.error(error);
  }
};
