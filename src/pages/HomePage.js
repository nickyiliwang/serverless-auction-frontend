import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function HomePage() {
  const { isLoading, error } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  return (
    <div>
      <h1>Welcome to the Nick's Auction Service</h1>
      <p>Please Sign in to use the service!</p>
    </div>
  );
}
