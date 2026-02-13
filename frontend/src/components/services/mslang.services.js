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

export const getLanguage = async () => {
  const res = await axios.post("http://127.0.0.1:8080/table/language");
  return res.data.data;
};

export const formLanguage = async (languageid) => {
  const res = await axios.get(`http://127.0.0.1:8080/forms/${languageid}`);
  return res.data.data[0];
};

export const insertLanguage = (data) => {
  axios.post("http://127.0.0.1:8080/insert/language", data).then((res) => {
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
  });
};

export const editLanguage = (data) => {
  axios.post("http://127.0.0.1:8080/edit/language", data).then((res) => {
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
  });
};

export const deleteLanguage = async (languageid) => {
  Swal.fire({
    title: "Are you sure?",
    text: "Deleted data cannot be restored!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .delete(`http://127.0.0.1:8080/language/${languageid}`)
        .then((res) => {
          if (res.data.status === "success") {
            Toast.fire({
              icon: "success",
              title: res.data.message,
            }).then(() => {
              window.location.reload();
            });
          } else {
            Toast.fire({
              icon: "success",
              title: res.data.message,
            });
          }
        });
    }
  });
};
