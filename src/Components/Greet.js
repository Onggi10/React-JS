import React from "react";
import propTypes from "prop-types";

const Greet = (props) => {
  const { names, username, color } = props;
  return (
    <div>
      <h1>
        Hello, {names} your user name is : {username}, your fav color is : {color}
      </h1>
    </div>
  );
};
Greet.propTypes = {
  names: propTypes.string,
  username: propTypes.string,
  color: propTypes.string,
};

export default Greet;
