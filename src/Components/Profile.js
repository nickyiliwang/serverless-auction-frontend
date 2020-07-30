import React from "react";

const Profile = ({ user }) => {
  return (
    <>
      <p>Hello There</p>
      <img src={user.picture} alt="Profile" />
      {user.name}
    </>
  );
};

export default Profile;
