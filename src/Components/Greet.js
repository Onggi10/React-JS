import React from "react";

const Greet = ({ names, username, color }) => {
  return (
    <div>
      <h1>
        Hello, {names} your user name is : {username}, your fav color is :
        {color}
      </h1>
    </div>
  );
};
export default Greet;
