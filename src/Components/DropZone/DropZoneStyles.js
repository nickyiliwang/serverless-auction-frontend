import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  dropZone: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    fontWeight: 200,
    border: "1px solid rgba(var(--b6a, 219, 219, 219), 1)",
    borderRadius: "5px",
    cursor: "pointer",
    margin: "10px 0",
    height: "300px",
  },
  textContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    "& p": {
      marginTop: "20px",
      fontSize: 20,
    },
  },
});
