import { Box } from "@mui/material";
import { FC } from "react";
import Props from "../../models/Props";
import Header from "../Header";
import OnTop from "../OnTop";
import Sidenav from "../Sidenav";

const MainLayout: FC<Props> = ({ children }) => {
  return (
    <Box>
      <Header />

      <Box mt='67px'>{children}</Box>
      <OnTop />
    </Box>
  );
};

export default MainLayout;
