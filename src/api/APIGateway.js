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
