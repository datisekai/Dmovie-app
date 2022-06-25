import { useRouter } from "next/router";
import React, { FC } from "react";
import ReactPlayer from "react-player";
import VideoCard from "../../models/VideoCard";

const VideoCard: FC<VideoCard> = ({ keyVideo }) => {
  const router = useRouter();

  if (!router.query.key) {
    return (
      <iframe
        width={"100%"}
        height='auto'
        style={{ aspectRatio: "16/9", border: "none", borderRadius: "10px" }}
        allowFullScreen={true}
        src={keyVideo}
      ></iframe>
    );
  }

  return (
    <>
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${keyVideo}`}
        playing={true}
        width='100%'
        height={"auto"}
        style={{ aspectRatio: "16/9" }}
        controls={true}
      />
    </>
  );
};

export default VideoCard;
