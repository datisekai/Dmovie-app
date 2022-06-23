import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import { primary } from "../theme/theme";
import BackupIcon from "@mui/icons-material/Backup";
import { TextFields } from "@mui/icons-material";
import WidthLayout from "./layout/WidthLayout";
import useScrollProgress from "../hooks/useScrollProgress";
import Link from "next/link";

const Header = () => {
  const width = useScrollProgress();

  return (
    <Box
      id='shadowBottom'
      sx={{
        position: "fixed",
        top: 0,
        right: 0,
        left: 0,
        zIndex: 9999,
        bgcolor: "white",
      }}
    >
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
          <Link href={"/"}>
            <a>
              <Typography color={primary.main} fontSize='25px'>
                DMovie
              </Typography>
            </a>
          </Link>
          <TextField
            size='small'
            id='outlined-basic'
            label='Tìm kiếm'
            fullWidth
            sx={{
              display: {
                md: "inline-block",
                xs: "none",
              },
              width: "500px",
            }}
            variant='outlined'
          />
          <Box>
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
