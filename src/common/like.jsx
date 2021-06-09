import React from "react";

const like = (props) => {
  const {liked,onLike} = props

  let classes = "fa fa-heart";
  if (!liked) {
    classes += "-o";
  }

  return (
    <i
      className={classes}
      onClick={onLike}
      style={{ cursor: "pointer" }}
    ></i>
  );
};

export default like;
