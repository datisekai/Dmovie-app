import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { primary } from "../theme/theme";
import sidebar from "./data/sidebar";
import Login from "./Login";
import LoginIcon from "@mui/icons-material/Login";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../config/firebase";
import swal from "sweetalert";
import { setUser } from "../redux/slices/authSlice";
interface SidenavProps {
  display: boolean;
  handleHide: any;
}

const Sidenav: FC<SidenavProps> = ({ display, handleHide }) => {
  const router = useRouter();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const handleLogin = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        dispatch(setUser(result.user));
      })
      .catch((error) => {
        console.log(error);

        swal("Error", "Internal server", "error");
      });
  };
  return (
    <Box
      sx={{
        display: {
          md: "none",
          xs: `${display ? "block" : "none"}`,
        },
      }}
    >
      <div onClick={handleHide} id='overlay'></div>
      <Box
        sx={{
          position: "fixed",
          zIndex: 120,
          top: 0,
          bottom: 0,
          left: 0,
          bgcolor: "white",
          width: "70%",
          animation: "0.3s ease-in leftToRight",
          p: "20px",
          boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.25)",
        }}
        id={theme}
      >
        <Typography
          fontWeight={600}
          fontSize='22px'
          align='center'
          color={primary.main}
          pb='20px'
        >
          DMovie
        </Typography>
        {sidebar.map((item: any) => {
          const Icon = item.icon;
          return (
            <Box key={item.url} sx={{ textAlign: "left", mt: "10px" }}>
              <Button
                fullWidth
                onClick={() => router.push(`${item.url}`)}
                variant={router.pathname == item.url ? "contained" : "text"}
                key={item.url}
                startIcon={<Icon />}
              >
                {item.title}
              </Button>
            </Box>
          );
        })}
        {!user && (
          <Button
            sx={{ mt: "10px", textAlign: "left" }}
            fullWidth
            onClick={handleLogin}
            variant={"text"}
            startIcon={<LoginIcon />}
          >
            Đăng nhập
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Sidenav;
