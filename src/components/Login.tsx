import { Button } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { auth, provider } from "../config/firebase";
import { setUser } from "../redux/slices/authSlice";
import { RootState } from "../redux/store";
import User from "./User";
const Login = () => {
  const dispatch = useDispatch();
  const handleLoginGoogle = async () => {
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
    <Button
      sx={{
        display: {
          md: "inline-flex",
          xs: "none",
        },
      }}
      variant='contained'
      onClick={handleLoginGoogle}
    >
      Đăng nhập
    </Button>
  );
};

export default Login;
