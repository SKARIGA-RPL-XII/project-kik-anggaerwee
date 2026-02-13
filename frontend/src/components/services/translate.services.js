import axios from "axios"
import Swal from "sweetalert2";

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

export const InputText = async (data) => {
  try {
    const res = await axios.post(
      "http://127.0.0.1:8080/input/translate",
      data
    );

    if (res.data.status === "success") {
      return res.data;
    } else {
      Toast.fire({
        icon: "error",
        title: "Translate gagal",
      });
      return null;
    }
  } catch (err) {
    Toast.fire({
      icon: "error",
      title: "Server error",
    });
    return null;
  }
};

export const getLanguages = async () => {
  const res = await axios.post("http://127.0.0.1:8080/get/language");
  return res.data;
}
