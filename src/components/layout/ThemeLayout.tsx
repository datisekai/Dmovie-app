import { onAuthStateChanged } from "firebase/auth";
import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../config/firebase";
import Props from "../../models/Props";
import { setUser } from "../../redux/slices/authSlice";
import { setTheme } from "../../redux/slices/themeSlice";
import { RootState } from "../../redux/store";

const ThemeLayout: FC<Props> = ({ children }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);

  const userInfo = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(setUser(undefined));
      }
    });
    return () => {
      unSubscribe();
    };
  }, [userInfo]);

  useEffect(() => {
    if (localStorage.getItem("theme")) {
      theme !== localStorage.getItem("theme") &&
        dispatch(setTheme(localStorage.getItem("theme")));
    } else {
      localStorage.setItem("theme", "light");
    }
  }, [dispatch]);
  return <>{children}</>;
};

export default ThemeLayout;
