import { Box, Typography } from "@mui/material";
import { onValue, ref } from "firebase/database";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { database } from "../../config/firebase";
import { RootState } from "../../redux/store";
import { calculateCreatedTime2 } from "../../utils/formatTime";
import FlexBox from "../FlexBox";
import ReviewCard from "./ReviewCard";

import MainAddComment from "./MainAddComment";

const Reviews = ({ data, media_type }: any) => {
  const user: any = useSelector((state: RootState) => state.auth.user);

  const router = useRouter();
  const [comments, setComments] = useState<any>({
    parents: [],
    childs: [],
  });

  useEffect(() => {
    const unSub = onValue(ref(database), (snapshot) => {
      const data = snapshot.val();

      if (data !== null) {
        let commentsRealtime: any[] = [];

        for (const property in data) {
          if (
            data[property].movieId === router.query.id &&
            data[property].media_type === media_type
          ) {
            commentsRealtime.push({
              ...data[property],
              uuid: property,
            });
          }
        }
        commentsRealtime.sort((a, b) => +b.createdAt - +a.createdAt);
        const parents = commentsRealtime.filter(
          (item) => item.parentId == null
        );
        setComments({
          parents: parents.sort((a, b) => +b.createdAt - +a.createdAt),
          childs: commentsRealtime,
        });
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
          {comments.parents.length}
        </Typography>
      </FlexBox>
      {user && <MainAddComment media_type={media_type} />}
      <Box mt='20px'>
        {comments.parents.map((item: any) => (
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
            childs={comments.childs.filter(
              (child: any) => child.parentId == item.uuid
            )}
            listComments={comments.childs}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Reviews;
