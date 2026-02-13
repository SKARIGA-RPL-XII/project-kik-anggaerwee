import axios from "axios";
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

export const processUpload = async (files) => {
  const formData = new FormData();
  formData.append("file", files[0]);

  try {
    const res = await axios.post(
      "http://127.0.0.1:8080/uploadfile",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    if (res.data.status === "success") {
      return res.data.text; 
    } else {
      Toast.fire({
        icon: "error",
        title: res.data.message,
      });
      return null;
    }
  } catch (err) {
    Toast.fire({
      icon: "error",
      title: "Upload gagal",
    });
    return null;
  }
};
