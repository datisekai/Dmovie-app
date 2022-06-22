import { Button, Typography } from "@mui/material";
import React, { FC } from "react";
import FlexBox from "./FlexBox";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import FlexTitle from "../models/FlexTitle";
import Link from "next/link";

const FlexTitle: FC<FlexTitle> = ({ url, title }) => {
  return (
    <FlexBox
      justifyContent={"space-between"}
      alignItems='center'
      borderBottom={"1px solid #ccc"}
      pb='10px'
    >
      <Typography fontSize={"20px"} fontWeight='500'>
        {title}
      </Typography>
      <Link href={url}>
        <a>
          <Button
            variant='text'
            color='inherit'
            sx={{
              fontSize: "16px",
              fontWeight: "400",
              textTransform: "inherit",
            }}
            endIcon={<NavigateNextIcon />}
          >
            Xem tất cả
          </Button>
        </a>
      </Link>
    </FlexBox>
  );
};

export default FlexTitle;
