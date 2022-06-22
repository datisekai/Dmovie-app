import { Box } from "@mui/material";
import { FC } from "react";
import Props from "../../models/Props";
import Header from "../Header";
import OnTop from "../OnTop";

const MainLayout: FC<Props> = ({ children }) => {
  return (
    <Box>
      <Header />
      <Box>{children}</Box>
      <OnTop />
    </Box>
  );
};

export default MainLayout;
