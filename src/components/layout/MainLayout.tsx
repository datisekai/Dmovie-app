import { Box } from "@mui/material";
import { FC } from "react";
import { useSelector } from "react-redux";
import Props from "../../models/Props";
import { RootState } from "../../redux/store";
import Header from "../Header";
import OnTop from "../OnTop";
import Sidenav from "../Sidenav";

const MainLayout: FC<Props> = ({ children }) => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  return (
    <Box id={`${theme}`}>
      <Header />

      <Box mt='67px'>{children}</Box>
      <OnTop />
    </Box>
  );
};

export default MainLayout;
