import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Avatar, Box, Button, Typography } from "@mui/material";
import HeadlessTippy from "@tippyjs/react/headless";
import { ref, remove, set, update } from "firebase/database";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { useSelector } from "react-redux";
import swal from "sweetalert";
import { v4 as uuidv4 } from "uuid";
import { database } from "../../config/firebase";
import ReviewCard from "../../models/ReviewCard";
import { RootState } from "../../redux/store";
import { calculateCreatedTime2 } from "../../utils/formatTime";
import { reactionImage } from "../data/reaction";
import FlexBox from "../FlexBox";
import Reaction from "../Detail/Reaction";
import TextComment from "../Detail/TextComment";

const ReviewCard: FC<ReviewCard> = ({
  image,
  name,
  createdAt,
  content,
  uuid,
  userId,
  media_type,
  reactions,
  listComments,
  childs,
}) => {
  const RenderChild: FC<ReviewCard> = ({
    content,
    createdAt,
    image,
    name,
    media_type,
    userId,
    uuid,
    reactions,
    childs,
    listComments,
  }) => {
    const [showUpdate, setShowUpdate] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const theme = useSelector((state: RootState) => state.theme.theme);
    const [showMenu, setShowMenu] = useState(false);
    const user: any = useSelector((state: RootState) => state.auth.user);

    const [comment, setComment] = useState(content);
    const [showRep, setShowRep] = useState(false);
    const [repComment, setRepComment] = useState(name + " ");
    const router = useRouter();

    const handleDelete = () => {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this comment!",
        icon: "warning",
        buttons: ["Hủy", true],
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          remove(ref(database, `${uuid}`));
        }
      });
    };

    const handleUpdate = () => {
      if (comment.trim().length > 0) {
        update(ref(database, `${uuid}`), {
          content: comment,
        });
        setShowUpdate(false);
      }
    };

    const handleChangeComment = (e: any) => {
      setComment(e.target.value);
    };

    const handleChangeRepComment = (e: any) => {
      setRepComment(e.target.value);
    };

    const handleAddRepComment = () => {
      set(ref(database, `${uuidv4()}`), {
        userId: user.uid,
        content: repComment,
        parentId: uuid,
        movieId: router.query.id,
        photoURL: user.photoURL,
        displayName: user.displayName,
        createdAt: Date.now(),
        media_type,
      });
      setRepComment("");
    };

    return (
      <>
        <FlexBox mt='20px'>
          <Avatar alt='Remy Sharp' src={`${image}`} />
          {!showUpdate && (
            <Box pl='10px'>
              <FlexBox alignItems={"center"}>
                <Typography fontWeight={500}>{name}</Typography>
                <Typography
                  component={"span"}
                  pl='10px'
                  color={theme === "dark" ? "#ccc" : "#333"}
                >
                  {createdAt}
                </Typography>
                {reactions && JSON.parse(reactions).length > 0 && (
                  <FlexBox alignItems={"center"} pl='10px'>
                    <FlexBox alignItems={"center"}>
                      {JSON.parse(reactions).map((item: any, index: number) => {
                        return (
                          <img
                            key={index}
                            src={reactionImage[item.iconId]}
                            style={{
                              width: "15px",
                              height: "15px",
                              marginLeft: "2px",
                            }}
                          />
                        );
                      })}
                    </FlexBox>
                    <Typography
                      component={"span"}
                      pl='6px'
                      color={theme === "dark" ? "#ccc" : "#333"}
                    >
                      {JSON.parse(reactions).length}
                    </Typography>
                  </FlexBox>
                )}
              </FlexBox>
              <Typography
                component={"p"}
                color={theme === "dark" ? "#ccc" : "#333"}
              >
                {content.length > 200
                  ? showAll
                    ? content
                    : content.slice(0, 200) + "..."
                  : content}
              </Typography>

              {content.length > 200 && (
                <Button
                  onClick={() => setShowAll(!showAll)}
                  size='small'
                  variant='text'
                >
                  {showAll ? "Thu gọn" : "Xem tất cả"}
                </Button>
              )}
              {user && (
                <FlexBox alignItems={"center"} width='100%'>
                  <Reaction reactions={reactions} uuid={uuid} />
                  <Button
                    sx={{ pl: "10px", textTransform: "inherit" }}
                    onClick={() => {
                      setShowRep(true);
                    }}
                  >
                    Phản hồi
                  </Button>
                  {userId && userId === user.uid && (
                    <Box sx={{ pl: "10px" }}>
                      <HeadlessTippy
                        interactive
                        visible={showMenu}
                        onClickOutside={() => setShowMenu(false)}
                        render={(attrs) => (
                          <Box
                            {...attrs}
                            sx={{
                              width: "150px",
                              boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.25)",
                              borderRadius: "10px",
                              py: "10px",
                            }}
                            id={theme}
                          >
                            <Button
                              onClick={() => setShowUpdate(!showUpdate)}
                              size='small'
                              fullWidth
                            >
                              Chỉnh sửa
                            </Button>
                            <Button
                              onClick={handleDelete}
                              size='small'
                              fullWidth
                            >
                              Xóa
                            </Button>
                          </Box>
                        )}
                      >
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={() => setShowMenu(!showMenu)}
                        >
                          {" "}
                          <MoreHorizIcon color='primary' />
                        </div>
                      </HeadlessTippy>
                    </Box>
                  )}
                </FlexBox>
              )}
              {showRep && (
                <FlexBox alignItems={"center"} width='100%'>
                  <Avatar alt='Remy Sharp' src={`${user.photoURL}`} />
                  <Box>
                    <TextComment
                      value={repComment}
                      handleChange={handleChangeRepComment}
                      handleSubmit={handleAddRepComment}
                    />
                    <Button
                      onClick={() => {
                        setShowRep(false);
                      }}
                    >
                      Hủy
                    </Button>
                  </Box>
                </FlexBox>
              )}
            </Box>
          )}
          {showUpdate && (
            <Box width={"100%"}>
              <TextComment
                value={comment}
                handleChange={handleChangeComment}
                handleSubmit={handleUpdate}
              />
              <Button
                onClick={() => {
                  setShowMenu(false);
                  setShowUpdate(false);
                }}
              >
                Hủy
              </Button>
            </Box>
          )}
        </FlexBox>
        {childs &&
          childs.map((item: any) => (
            <Box pl={"20px"} key={item.uuid}>
              <RenderChild
                image={item.photoURL}
                name={item.displayName}
                createdAt={calculateCreatedTime2(item.createdAt)}
                content={item.content}
                uuid={item.uuid}
                userId={item.userId}
                media_type={item.media_type}
                reactions={item.reactions}
                childs={listComments?.filter(
                  (child: any) => child.parentId == item.uuid
                )}
                listComments={listComments}
              />
            </Box>
          ))}
      </>
    );
  };

  return (
    <>
      <RenderChild
        image={image}
        name={name}
        createdAt={createdAt}
        content={content}
        uuid={uuid}
        userId={userId}
        media_type={media_type}
        reactions={reactions}
        childs={childs}
        listComments={listComments}
      />
    </>
  );
};

export default ReviewCard;
