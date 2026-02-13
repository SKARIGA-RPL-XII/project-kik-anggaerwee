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

export const insertHistory = (data) => {
  axios.post("http://127.0.0.1:8080/insert/history", data).then((res) => {
    if (res.data.status === "success") {
      Toast.fire({
        icon: "success",
        title: res.data.message,
      });
    } else {
      Toast.fire({
        icon: "error",
        title: res.data.message,
      });
    }
  });
};

export const getHistory = async () => {
  const res = await axios.post("http://127.0.0.1:8080/table/history");
  return res.data.data;
};

export const listHistory = async (userid, createddate = null) => {
  const res = await axios.post("http://127.0.0.1:8080/list/history", {
    userid,
    createddate,
  });

  return res.data.data;
};


export const deleteHistory = (historyid) => {
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
        .post("http://127.0.0.1:8080/delete/history", { historyid })
        .then((res) => {
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
        });
    }
  });
};
