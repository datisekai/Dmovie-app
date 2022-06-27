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

import TextComment from "./TextComment";
import MainAddComment from "./MainAddComment";

const Reviews = ({ data, media_type }: any) => {
  const user: any = useSelector((state: RootState) => state.auth.user);
  const theme = useSelector((state: RootState) => state.theme.theme);

  const router = useRouter();
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    const unSub = onValue(ref(database), (snapshot) => {
      const data = snapshot.val();

      if (data !== null) {
        let commentsRealtime: any[] = [];

        for (const property in data) {
          if (
            data[property].movieId === router.query.id &&
            data[property].media_type === media_type &&
            data[property].parentId == null
          ) {
            commentsRealtime.push({
              ...data[property],
              uuid: property,
            });
          }
        }
        setComments(
          commentsRealtime.sort((a, b) => +b.createdAt - +a.createdAt)
        );
      }
    });

    return () => {
      unSub();
    };
  }, []);

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
      {user && <MainAddComment media_type={media_type} />}
      <Box mt='20px'>
        {comments.map((item: any) => (
          <ReviewCard
            key={item.id}
            content={item.content}
            createdAt={calculateCreatedTime2(item.createdAt)}
            image={item.photoURL}
            name={item.displayName}
            userId={item.userId}
            uuid={item.uuid}
            media_type={media_type}
            reactions={item.reactions}
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
