import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { loading, user } = useAuth0();

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <p>Hello There</p>
      <img src={user.picture} alt="Profile" />
      {user.name}
    </>
  );
};

export default Profile;
