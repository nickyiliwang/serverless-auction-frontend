import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

const PrivateRoute = ({ component, ...args }) => (
  <Route component={withAuthenticationRequired(component)} {...args} />
);

export default PrivateRoute;
