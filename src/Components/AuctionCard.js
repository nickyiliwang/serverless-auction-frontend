import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import Countdown from "react-countdown";

import {
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
} from "@material-ui/core";
import moment from "moment";

import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { blue } from "@material-ui/core/colors";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ImageIcon from "@material-ui/icons/Image";
import PlaceBid from "../Components/PlaceBid";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 350,
    maxWidth: 345,
    margin: "20px 20px 20px 0",
  },
  media: {
    height: 0,
    paddingTop: "59.9%",
    backgroundPosition: "top",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: blue[500],
  },
}));

export default function AuctionCard({ auctionToRender }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const {
    createdAt,
    endingAt,
    highestBid,
    seller,
    pictureUrl,
    status,
    title,
  } = auctionToRender;

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <ImageIcon />
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader={`Created At: ${moment(createdAt).format("MMM YYYY, Do")}`}
      />
      <CardMedia
        className={classes.media}
        image={pictureUrl}
        title={title}
        media="picture"
      />
      <CardContent>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          display="block"
        >
          Time Remaining:
          <Countdown
            date={endingAt}
            renderer={({ hours, minutes, seconds }) => (
              <span>
                {hours} hours {minutes} mins {seconds} secs
              </span>
            )}
          />
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          display="block"
        >
          Auction Status: {status}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          display="block"
        >
          Seller: {seller}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          display="block"
        >
          Highest Bid: {highestBid.amount}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          display="block"
        >
          Highest Bidder:{" "}
          {highestBid.bidder ? highestBid.bidder : "No bidders yet"}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <PlaceBid auctionToRender={auctionToRender} />
      </CardActions>
    </Card>
  );
}
