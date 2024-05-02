import React from "react";
import { Button } from "./ui/button";
import { FcLike } from "react-icons/fc";
import { AiFillLike } from "react-icons/ai";
import PropTypes from "prop-types";

const LikeButton = ({ handleLike, likes }) => {
  return (
    <div className="flex items-center gap-x-4 ">
      <Button
        id="like-btn"
        data-testid="like-btn"
        onClick={handleLike}
        className="rounded-lg bg-accent hover:bg-accent/80 text-card-foreground "
      >
        <div className="flex items-center gap-x-2">
          <div>Like</div>
          <FcLike />
        </div>
      </Button>
      <div className="flex items-center gap-x-2 text-accent" id="likes-count">
        <AiFillLike /> {likes}
      </div>
    </div>
  );
};

LikeButton.propTypes = {
  handleLike: PropTypes.func.isRequired,
  likes: PropTypes.number,
};

export default LikeButton;
