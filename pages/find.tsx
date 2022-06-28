import { Box } from "@mui/material";
import React from "react";
import FlexBox from "../src/components/FlexBox";
import HomeLayout from "../src/components/layout/HomeLayout";
import SearchName from "../src/components/SearchName";

const Find = () => {
  return (
    <HomeLayout>
      <FlexBox py='20px' justifyContent={"center"} width='100%'>
        <SearchName />
      </FlexBox>
    </HomeLayout>
  );
};

export default Find;
