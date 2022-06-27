import { Avatar } from "@mui/material";
import { ref, set } from "firebase/database";
import React, { useState } from "react";
import { database } from "../../config/firebase";
import FlexBox from "../FlexBox";
import TextComment from "./TextComment";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useRouter } from "next/router";

const MainAddComment = ({ media_type }: any) => {
  const user: any = useSelector((state: RootState) => state.auth.user);
  const [comment, setComment] = useState("");
  const router = useRouter();
  const handleComment = () => {
    set(ref(database, `${uuidv4()}`), {
      userId: user.uid,
      content: comment,
      parentId: null,
      movieId: router.query.id,
      photoURL: user.photoURL,
      displayName: user.displayName,
      createdAt: Date.now(),
      media_type,
    });
    setComment("");
  };

  const handleChangeComment = (e: any) => {
    setComment(e.target.value);
  };
  return (
    <FlexBox alignItems={"center"} sx={{ my: "10px" }}>
      <Avatar alt={user.displayName} src={user.photoURL} />
      <TextComment
        value={comment}
        handleChange={handleChangeComment}
        handleSubmit={handleComment}
      />
    </FlexBox>
  );
};

export default MainAddComment;
