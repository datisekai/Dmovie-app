import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { Box, Button, FormControlLabel, Typography } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useScrollProgress from "../hooks/useScrollProgress";
import { setTheme } from "../redux/slices/themeSlice";
import { RootState } from "../redux/store";
import { primary } from "../theme/theme";
import DarkModeIcon from "./DarkModeIcon";
import FlexBox from "./FlexBox";
import WidthLayout from "./layout/WidthLayout";
import Login from "./Login";
import SearchName from "./SearchName";
import Sidenav from "./Sidenav";
import User from "./User";
import SearchIcon from "@mui/icons-material/Search";
const Header = () => {
  const [showBar, setShowBar] = useState(false);
  const width = useScrollProgress();
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const user = useSelector((state: RootState) => state.auth.user);

  const handleHideBar = () => {
    setShowBar(false);
  };

  const handleChangTheme = (e: any) => {
    if (e.target.checked) {
      dispatch(setTheme("dark"));
    } else {
      dispatch(setTheme("light"));
    }
  };

  return (
    <Box
      id={theme}
      sx={{
        position: "fixed",
        top: 0,
        right: 0,
        left: 0,
        zIndex: 90,
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Sidenav display={showBar} handleHide={handleHideBar} />
      <WidthLayout>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: "64px",
            px: "20px",
            justifyContent: "space-between",
          }}
        >
          <div id='iconBar' onClick={() => setShowBar(true)}>
            <MenuOpenIcon
              sx={{
                color: primary.main,
              }}
              fontSize='medium'
            />
          </div>
          <Link href={"/"}>
            <a>
              <Typography component={"h2"} color={primary.main} fontSize='25px'>
                DMovie
              </Typography>
            </a>
          </Link>
          <Box
            sx={{
              display: {
                md: "block",
                xs: "none",
              },
            }}
          >
            <SearchName />
          </Box>
          <FlexBox alignItems={"center"}>
            <DarkModeIcon
              onChange={handleChangTheme}
              sx={{ my: 1 }}
              checked={theme === "dark" ? true : false}
            />
            {user ? <User /> : <Login />}
          </FlexBox>
        </Box>
      </WidthLayout>
      <Box
        id='progress-container'
        sx={{ bgcolor: `${theme === "dark" ? "#333" : "#ccc"}` }}
      >
        <Box id='progress-bar' style={{ width: `${width}%` }}></Box>
      </Box>
    </Box>
  );
};

export default Header;
