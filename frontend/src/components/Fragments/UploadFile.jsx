
import { Repeat, Paperclip, ChevronDown } from "react-feather";
import UploadLogo from "../../assets/upload-logo.png";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import Swal from "sweetalert2";

const uploadFile = () => {
    // const [loading, setLoading] = useState(false);
    // const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
    //   useEffect(() => {
    //     if (loading) {
    //       Swal.fire({
    //         title: "Sedang memproses...",
    //         imageUrl: LoadingLogo,
    //         html: "File sedang diekstrak menjadi teks",
    //         allowOutsideClick: false,
    //         allowEscapeKey: false,
    //         didOpen: () => {
    //           Swal.showLoading();
    //         },
    //       });
    //     } else {
    //       Swal.close();
    //     }
    //   }, [loading]);
  return (
      <div className="mx-auto">
        <div
          {...getRootProps()}
          className="py-6 px-4 bg-slate-50 rounded-md border border-blue-100  shadow-md shadow-blue-100 w-full text-center cursor-pointer"
        >
          <input {...getInputProps()} />

          {isDragActive ? (
            <div className="flex flex-col items-center justify-center">
              <img src={UploadLogo} alt="" className="w-50" />
              <p>Drop the files here ...</p>
              <button className="bg-blue-400 hover:bg-blue-500 rounded-md px-3 py-1">
                Upload File
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <img src={UploadLogo} alt="" className="w-50" />
              <p className="">
                <span className="font-semibold">Drag and drop</span> some files
                here, or click to select file
              </p>
              <p className="text-sm text-muted text-slate-500 mb-3">
                Supported formats: JPG, PNG, JPEG, PDF
              </p>
              <div className="flex gap-2">
                <button className="bg-blue-400 hover:bg-blue-500 rounded-md px-3 py-1 text-white cursor-pointer">
                  Upload File
                </button>
                <button className="bg-blue-400 hover:bg-blue-500 rounded-md p-2 text-white cursor-pointer">
                  <Paperclip size={20} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
  );
};

export default uploadFile;
