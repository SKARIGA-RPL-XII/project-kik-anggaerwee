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

const showAlert = ({title, description}) => {
    return (
        <div className="flex justify-center items-center w-full">
            <Alert title={title} description={description} type="success" />
        </div>
    )
}

export default showAlert;