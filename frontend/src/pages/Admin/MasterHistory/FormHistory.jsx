import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import {
  editLanguage,
  insertLanguage,
  formLanguage,
} from "../../../components/services/mslang.services";
import { requestFormReset } from "react-dom";
const FormUser = ({ type = "add", languageid }) => {
  const [languagenm, setLanguagenm] = useState("");
  const [isactive, setIsactive] = useState(true);

  useEffect(() => {
  if (type === "edit" && languageid) {
    const fetchLang = async () => {
      try {
        const data = await formLanguage(languageid);
        if (data) {
          setLanguagenm(data.languagenm);
          setIsactive(data.isactive);
        }
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    };
    fetchLang();
  }
}, [type, languageid]);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);

    const data = {
      languageid: languageid,
      languagenm: event.target.languagename.value,
      isactive: isactive === "true",
      created: decoded.usernm,
    };

    if (type === "edit") {
      editLanguage(data);
    } else {
      insertLanguage(data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 grid-cols-2 py-4 md:py-6">
        <div className="col-span-2">
          <label htmlFor="language" className="block mb-2.5 text-sm font-medium text-heading">
            Languagenm
          </label>
          <input
            type="text"
            name="languagename"
            value={languagenm}
            onChange={(e) => setLanguagenm(e.target.value)}
            className="bg-neutral-secondary-medium border border-default-medium text-sm rounded-base w-full px-3 py-2.5"
            placeholder="Enter Languagename"
          />
        </div>

        <div className="col-span-2 sm:col-span-1">
          <label className="block mb-2.5 text-sm font-medium text-heading">
            Isactive
          </label>

          <div className="px-2 space-y-1">
            <div className="form-check">
              <input
                type="radio"
                name="status"
                checked={isactive === true}
                onChange={() => setIsactive(true)}
                className="form-check-input"
                id="active"
              />
              <label htmlFor="active" className="form-check-label">
                Active
              </label>
            </div>

            <div className="form-check">
              <input
                type="radio"
                name="status"
                checked={isactive === false}
                onChange={() => setIsactive(false)}
                className="form-check-input"
                id="inactive"
              />
              <label htmlFor="inactive" className="form-check-label">
                Inactive
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4 border-t pt-4 md:pt-6">
        <button
          type="submit"
          className="inline-flex items-center text-green-400 border border-green-500 hover:bg-green-400 hover:text-black px-4 py-2.5 text-sm cursor-pointer"
        >
          <i className="fa-solid fa-circle-check me-2"></i>
          {type === "edit" ? "Update Changes" : "Save Changes"}
        </button>

        <button className="inline-flex items-center text-red-400 border border-red-500 hover:bg-red-400 hover:text-black px-4 py-2.5 text-sm cursor-pointer">
          <i className="fa-solid fa-arrows-rotate me-2"></i>
          Reset
        </button>
      </div>
    </form>
  );
};

export default FormUser;
