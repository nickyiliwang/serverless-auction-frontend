import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card,  } from "@material-ui/core";
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
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ImageIcon from "@material-ui/icons/Image";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 350,
    maxWidth: 345,
    margin: "20px 0",
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
    id,
    pictureUrl,
    seller,
    status,
    title,
  } = auctionToRender;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
          {status}
          <Countdown
            date={endingAt}
            renderer={({ hours, minutes, seconds }) => (
              <span>
                {hours} hours {minutes} mins {seconds} secs
              </span>
            )}
          />
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
