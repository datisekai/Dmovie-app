import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Props from "../../models/Props";
import { setTheme } from "../../redux/slices/themeSlice";
import { RootState } from "../../redux/store";

const ThemeLayout: FC<Props> = ({ children }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);
  useEffect(() => {
    if (localStorage.getItem("theme")) {
      theme !== localStorage.getItem("theme") &&
        dispatch(setTheme(localStorage.getItem("theme")));
    } else {
      localStorage.setItem("theme", "light");
    }
  }, []);
  return <>{children}</>;
};

export default ThemeLayout;
