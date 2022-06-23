import { Box } from "@mui/material";
import React, { FC } from "react";
import Props from "../../models/Props";
import FlexBox from "../FlexBox";
import SideBar from "../Home/SideBar";
import Meta from "../Meta";
import MainLayout from "./MainLayout";
import WidthLayout from "./WidthLayout";

const HomeLayout: FC<Props> = ({ children }) => {
  return (
    <MainLayout>
      <Meta
        image={`https://image.tmdb.org/t/p/w500/wcKFYIiVDvRURrzglV9kGu7fpfY.jpg`}
        title={"Dmovie | Watch movie"}
        description={"This is a web watch movie"}
      />
      <WidthLayout>
        <FlexBox>
          <SideBar />
          <Box sx={{ flex: 1, p: "20px" }}>{children}</Box>
        </FlexBox>
      </WidthLayout>
    </MainLayout>
  );
};

export default HomeLayout;
