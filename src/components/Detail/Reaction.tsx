import React, { FC } from "react";
import HeadlessTippy from "@tippyjs/react/headless";
import { Box, Button } from "@mui/material";
import { reactionGif } from "../data/reaction";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { database } from "../../config/firebase";
import { ref, update } from "firebase/database";

interface Reaction {
  reactions: string | undefined;
  uuid: string | undefined;
}

const Reaction: FC<Reaction> = ({ reactions, uuid }) => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const user: any = useSelector((state: RootState) => state.auth.user);
  const handleAddReaction = (iconId: string) => {
    let newReactions = [];
    if (reactions) {
      const isExist = JSON.parse(reactions).find(
        (item: any) => item.userId == user.uid
      );

      if (isExist && isExist.iconId != iconId) {
        newReactions = JSON.parse(reactions).map((item: any) => {
          if (item.userId == user.uid) {
            return {
              ...item,
              iconId,
            };
          }
          return item;
        });
      } else if (isExist && isExist.iconId == iconId) {
        newReactions = JSON.parse(reactions).filter(
          (item: any) => item.userId != user.uid
        );
      } else {
        newReactions = [...JSON.parse(reactions), { userId: user.uid, iconId }];
      }
    } else {
      newReactions.push({ userId: user.uid, iconId });
    }
    update(ref(database, `${uuid}`), {
      reactions: JSON.stringify(newReactions),
    });
  };
  return (
    <HeadlessTippy
      interactive
      render={(attrs) => (
        <Box
          {...attrs}
          sx={{
            boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.25)",
            borderRadius: "10px",
            display: "flex",
            transition: "0.5s",
            p: "4px",
          }}
          id={theme}
        >
          {reactionGif.map((item: any) => (
            <img
              src={item.image}
              alt={item.id}
              key={item.id}
              onClick={() => handleAddReaction(item.id)}
              className={"reactImage"}
            />
          ))}
        </Box>
      )}
    >
      <Button sx={{ textTransform: "inherit" }}>Thích</Button>
    </HeadlessTippy>
  );
};

export default Reaction;
