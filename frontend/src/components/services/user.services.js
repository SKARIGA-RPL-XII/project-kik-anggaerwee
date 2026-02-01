import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import { Logout } from "./auth.services";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

export const GetUser = async () => {
  try {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const userid = decoded.userid;

    const res = await axios.post("http://127.0.0.1:8080/get_user", { userid });
    return res.data;
  } catch (err) {
    console.error(err.response?.data || err);
    return null;
  }
};

export const UpdateProfile = (data) => {
  axios
    .post("http://127.0.0.1:8080/editprofil", data)
    .then((res) => {
      console.log(res.data);
      if (res.data.status === "success") {
        Toast.fire({
          icon: "success",
          title: res.data.message,
        }).then(() => {
          window.location.reload();
        });
      } else {
        Toast.fire({
          icon: "error",
          title: res.data.message,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const UpdatePassword = (data) => {
  const token = localStorage.getItem("token");
  axios
    .post("http://127.0.0.1:8080/editpassword", data)
    .then((res) => {
      console.log(" hasil update password", res);
      if (res.data.status === "success") {
        Toast.fire({
          icon: "success",
          title: res.data.message,
        }).then(() => {
          window.location.reload()
        })
      } else {
        Toast.fire({
          icon: "error",
          title: res.data.message,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
