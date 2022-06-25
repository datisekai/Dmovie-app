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
import WidthLayout from "./layout/WidthLayout";
import SearchName from "./SearchName";
import Sidenav from "./Sidenav";
const Header = () => {
  const [showBar, setShowBar] = useState(false);
  const width = useScrollProgress();
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);

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
              <Typography color={primary.main} fontSize='25px'>
                DMovie
              </Typography>
            </a>
          </Link>
          <SearchName />
          <Box>
            {/* <Button startIcon={<BackupIcon />} variant='text'>
              Tải lên
            </Button> */}
            <FormControlLabel
              control={
                <DarkModeIcon
                  onChange={handleChangTheme}
                  sx={{ m: 1 }}
                  checked={theme === "dark" ? true : false}
                />
              }
              label=''
            />
            <Button
              sx={{
                display: {
                  md: "inline-flex",
                  xs: "none",
                },
              }}
              variant='contained'
            >
              Đăng nhập
            </Button>
          </Box>
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
