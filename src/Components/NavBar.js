import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { makeStyles, Button } from "@material-ui/core";
import Profile from "./Profile";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#DCDCDC",
    padding: "15px 0",
    marginBottom: 24,
    color: "black",
    boxShadow: theme.shadows[5],
  },
  navbar: {
    display: "flex",
  },
  header: {
    display: "flex",

    alignItems: "center",
    width: "50%",
  },
  loginLogoutContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "50%",
  },
  title: {
    fontSize: "20px",
  },
  profileAndLogin: {
    display: "flex",
    "& *": {
      marginRight: 5,
    },
  },
  profile: {
    display: "flex",
    alignItems: "center",

    "& img": {
      width: 30,
      height: 30,
      borderRadius: 30,
    },
  },
}));

const NavBar = () => {
  const { user, loginWithPopup, logout, isAuthenticated } = useAuth0();

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className="wrapper">
        <div className={classes.navbar}>
          <div className={classes.header}>
            <h1 className={classes.title}>Nick's Auction Service</h1>
          </div>
          <div className={classes.loginLogoutContainer}>
            {!isAuthenticated && (
              <Button
                className={classes.button}
                onClick={() => loginWithPopup({})}
              >
                Sign in
              </Button>
            )}

            {isAuthenticated && (
              <div className={classes.profileAndLogin}>
                <div className={classes.profile}>
                  <Profile user={user} />
                </div>
                <Button className={classes.button} onClick={() => logout({})}>
                  Sign out
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
