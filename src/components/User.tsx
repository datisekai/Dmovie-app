import { Avatar, Box, Button } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import HeadlessTippy from "@tippyjs/react/headless";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
const User = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const user: any = useSelector((state: RootState) => state.auth.user);
  const [show, setShow] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        router.push("/");
      })
      .catch((error) => {});
  };
  return (
    <Box sx={{ display: "inline-flex" }}>
      <HeadlessTippy
        interactive
        visible={show}
        onClickOutside={() => setShow(false)}
        render={(attrs) => (
          <Box
            {...attrs}
            sx={{
              width: "150px",
              boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.25)",
              borderRadius: "10px",
              p: "10px",
            }}
            id={theme}
          >
            <Button fullWidth>{user.displayName}</Button>
            <Button
              onClick={handleLogout}
              sx={{ mt: "10px" }}
              fullWidth
              variant='outlined'
            >
              Đăng xuất
            </Button>
          </Box>
        )}
      >
        <div style={{ display: "inline-flex" }} onClick={() => setShow(!show)}>
          <Avatar alt={user.displayName} src={user.photoURL} />
        </div>
      </HeadlessTippy>
    </Box>
  );
};

export default User;
