import {
  Avatar,
  Box,
  Button,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { onValue, ref, set } from "firebase/database";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { database } from "../../config/firebase";
import { RootState } from "../../redux/store";
import {
  calculateCreatedTime,
  calculateCreatedTime2,
} from "../../utils/formatTime";
import FlexBox from "../FlexBox";
import ReviewCard from "./ReviewCard";

const Reviews = ({ data }: any) => {
  const user: any = useSelector((state: RootState) => state.auth.user);
  const theme = useSelector((state: RootState) => state.theme.theme);
  const [comment, setComment] = useState("");
  const router = useRouter();
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    onValue(ref(database), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((item: any) => {
          setComments((oldComments: any) => {
            const listComments: any[] = [...oldComments, item];
            return listComments.sort((a, b) => b.createdAt - a.createdAt);
          });
        });
      }
    });
  }, []);

  const handleComment = () => {
    set(ref(database, `${user.uid}`), {
      userId: user.uid,
      content: comment,
      parentId: null,
      movieId: router.query.id,
      photoURL: user.photoURL,
      displayName: user.displayName,
      createdAt: Date.now(),
      id: Math.random(),
    });
    setComment("");
  };
  return (
    <Box mt='10px'>
      <FlexBox pb='10px' alignItems={"center"} borderBottom={"1px solid #ccc"}>
        <Typography fontWeight={500} fontSize='18px'>
          Bình luận
        </Typography>
        <Typography pl='10px' fontWeight={500} fontSize='18px'>
          {data.length + comments.length}
        </Typography>
      </FlexBox>
      {user && (
        <FlexBox alignItems={"center"} sx={{ my: "10px" }}>
          <Avatar alt={user.displayName} src={user.photoURL} />
          <TextareaAutosize
            aria-label='minimum height'
            minRows={2}
            placeholder='Viết bình luận'
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            style={{
              width: "100%",
              marginLeft: "10px",
              outline: "none",
              border: "none",
              backgroundColor: `${theme === "dark" ? "#2a2a2a" : "#F2F2F2"}`,
              padding: "10px",
              borderRadius: "10px",
              fontSize: "15px",
            }}
          />
          <Button onClick={handleComment} disabled={comment ? false : true}>
            Gửi
          </Button>
        </FlexBox>
      )}
      <Box mt='20px'>
        {comments.map((item: any) => (
          <ReviewCard
            key={item.id}
            content={item.content}
            createdAt={calculateCreatedTime2(item.createdAt)}
            image={item.photoURL}
            name={item.displayName}
          />
        ))}
      </Box>
      <Box>
        {data?.map((item: any, index: number) => (
          <ReviewCard
            key={index}
            content={item.content}
            createdAt={calculateCreatedTime(item.created_at)}
            image={
              item.author_details.avatar_path &&
              item.author_details.avatar_path.slice(1)
            }
            name={item.author}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Reviews;
