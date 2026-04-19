import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Modal = ({ closeModal, title, children }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-2xl rounded-lg p-6 mx-3 shadow-lg">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            className="p-2 bg-transparent hover:bg-slate-200 rounded-md"
            onClick={() => closeModal(false)}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Body */}
        <div className="relative p-2 w-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
