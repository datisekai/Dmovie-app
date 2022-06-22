import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import { primary } from "../theme/theme";
import BackupIcon from "@mui/icons-material/Backup";
import { TextFields } from "@mui/icons-material";
import WidthLayout from "./layout/WidthLayout";

const Header = () => {
  return (
    <Box id='shadowBottom'>
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
          <Typography color={primary.main} fontSize='25px'>
            DMovie
          </Typography>
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
    </Box>
  );
};

export default Header;
