import { Button, TextareaAutosize } from "@mui/material";
import React, { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import FlexBox from "../FlexBox";

interface TextComment {
  value: string;
  handleChange: any;
  handleSubmit: any;
  ref?: any;
}

const TextComment: FC<TextComment> = ({
  value,
  handleChange,
  handleSubmit,
}) => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  return (
    <FlexBox width={"100%"} alignItems={"center"} pl='10px'>
      <TextareaAutosize
        aria-label='minimum height'
        minRows={2}
        placeholder='Viết bình luận'
        onChange={handleChange}
        value={value}
        style={{
          width: "100%",
          marginLeft: "10px",
          outline: "none",
          border: "none",
          backgroundColor: `${theme === "dark" ? "#2a2a2a" : "#F2F2F2"}`,
          padding: "10px",
          color: `${theme === "dark" ? "#ccc" : "black"}`,
          borderRadius: "10px",
          fontSize: "15px",
        }}
      />
      <Button onClick={handleSubmit} disabled={value ? false : true}>
        Gửi
      </Button>
    </FlexBox>
  );
};

export default TextComment;
