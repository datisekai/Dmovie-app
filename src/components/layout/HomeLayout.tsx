import { Box } from "@mui/material";
import React, { FC } from "react";
import { useSelector } from "react-redux";
import Snowfall from "react-snowfall";
import Props from "../../models/Props";
import { RootState } from "../../redux/store";
import FlexBox from "../FlexBox";
import SideBar from "../Home/SideBar";
import Meta from "../Meta";
import MainLayout from "./MainLayout";
import WidthLayout from "./WidthLayout";

const HomeLayout: FC<Props> = ({ children }) => {
  const theme = useSelector((state: RootState) => state.theme.theme);

  return (
    <MainLayout>
      {theme && theme === "dark" && <Snowfall />}
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
