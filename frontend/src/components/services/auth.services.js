import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

export const Register = (data) => {
  axios
    .post("http://127.0.0.1:8080/register", data)
    .then((res) => {
      console.log(res.data);
      if (res.data.status === "success") {
        Toast.fire({
          icon: "success",
          title: res.data.message,
        }).then(() => {
          window.location.href = "/";
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

export const Login = (data) => {
  axios
    .post("http://127.0.0.1:8080/login", data)
    .then((res) => {
      console.log(res.data);
      if (res.data.status === "success") {
        Toast.fire({
          icon: "success",
          title: res.data.message,
        }).then(() => {
          localStorage.setItem("token", res.data.access_token);
          if (res.data.role === "1") {
            window.location.href = "/user/dashboard";
          } else {
            window.location.href = "/admin/dashboard";
          }
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

export const getRole = (token) => {
  const decoded = jwtDecode(token);
  return decoded.role;
};

export const Logout = () => {
  localStorage.removeItem("token");
  window.location.replace("/");
};
