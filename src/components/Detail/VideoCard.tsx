import React, { FC } from "react";
import ReactPlayer from "react-player";
import VideoCard from "../../models/VideoCard";

const VideoCard: FC<VideoCard> = ({ keyVideo }) => {
  return (
    <>
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${keyVideo}`}
        playing={true}
        width='100%'
        style={{ aspectRatio: "16/9" }}
        controls={true}
      />
    </>
  );
};

export default VideoCard;
