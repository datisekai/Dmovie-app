import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { primary } from "../theme/theme";
import BackupIcon from "@mui/icons-material/Backup";
import { TextFields } from "@mui/icons-material";
import WidthLayout from "./layout/WidthLayout";
import useScrollProgress from "../hooks/useScrollProgress";
import Link from "next/link";
import SearchName from "./SearchName";
import Sidenav from "./Sidenav";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";

const Header = () => {
  const [showBar, setShowBar] = useState(false);
  const width = useScrollProgress();

  const handleHideBar = () => {
    setShowBar(false);
  };

  return (
    <Box
      id='shadowBottom'
      sx={{
        position: "fixed",
        top: 0,
        right: 0,
        left: 0,
        zIndex: 90,
        bgcolor: "white",
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
          <Box
            sx={{
              display: {
                md: "block",
                xs: "none",
              },
            }}
          >
            <Button startIcon={<BackupIcon />} variant='text'>
              Tải lên
            </Button>
            <Button variant='contained'>Đăng nhập</Button>
          </Box>
        </Box>
      </WidthLayout>
      {width > 0 && (
        <Box className='progress-container'>
          <Box className='progress-bar' style={{ width: `${width}%` }}></Box>
        </Box>
      )}
    </Box>
  );
};

export default Header;
