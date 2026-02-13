import { use, useEffect, useCallback, useState } from "react";
import NavbarLayout from "../../components/Layouts/NavbarLayouts";
import { useLogin } from "../../components/hooks/useLogin";
import { getRole } from "../../components/services/auth.services";
import { useDropzone } from "react-dropzone";
import {
  Repeat,
  Copy,
  Bookmark,
  Volume2,
  RefreshCcw,
} from "react-feather";
import Swal from "sweetalert2";
import {getLanguages, InputText,} from "../../components/services/translate.services";
import InputTrans from "./Translate/InputTrans";
import OutputTrans from "./Translate/OutputTrans";
import { jwtDecode } from "jwt-decode";
import { insertHistory } from "../../components/services/history.services";
import UploadFile from "../../components/Layouts/UploadFile";
import Loading from "../Loading";

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

const Dashboard = () => {
  const [languages, setLanguages] = useState([]);
  const [inputSelect, setInputSelect] = useState(null);
  const [outputSelect, setOutputSelect] = useState(null);
  useEffect(() => {
    const fetchLanguages = async () => {
    try {
      const res = await getLanguages();
      const langs = res?.data;

      if (!Array.isArray(langs) || langs.length === 0) {
        console.log("Data kosong / salah format");
        return;
      }

      setLanguages(langs);
      setInputSelect(langs[0]);
      setOutputSelect(langs[1]);

    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  fetchLanguages();
}, []);

  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [detect, setDetect] = useState("");
  const [loading, setLoading] = useState(false);

  useLogin("1");

  useEffect(() => {
    if (!text) return;

    const delay = setTimeout(() => {
      handleInput(new Event("submit"));
    }, 800);

    return () => clearTimeout(delay);
  }, [text, inputSelect]);

  useEffect(() => {
  if (loading) {
    Swal.fire({
      title: "Processing...",
      text: "Please wait a moment",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  } else {
    Swal.close();
  }
}, [loading]);


  const handleInput = async () => {
    const data = {
      text: text,
      model: inputSelect.value,
    };

    const output = await InputText(data);
    if (output) {
      setResult(output.output);
      setDetect(output.detect)
    }
  };

  const handleCopyText = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        Toast.fire({
          icon: "success",
          title: "Text has been copied",
        });
      })
      .catch(() => {
        Toast.fire({
          icon: "success",
          title: "Gagal Menyaln text",
        });
      });
  };

  const handleClear = (text) => {
    setText("");
    setResult("");
  };

  const handleSoundText = (text) => {
    const synth = window.speechSynthesis;

    if (synth.speaking) {
      synth.cancel();
      setSound(false);
      return;
    }

    if (!text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => {
      setSound(false);
    };
    synth.speak(utterance);
    setSound(true);
  };

  const handleSave = () =>{
    const token = localStorage.getItem("token")
    const decoded = jwtDecode(token)
    const data = {
      language_input: inputSelect.label,
      language_result: outputSelect.label,
      userid: decoded.userid,
      ocrtext: text,
      translated: result,
      created: decoded.usernm,
    }
    insertHistory(data)
  }

const handleChange = (detect) => {
  if (!detect || !languages.length) return;

  const selectedLang = languages.find(
    (lang) => lang.value === detect
  );

  if (selectedLang) {
    setOutputSelect(selectedLang);
  }
};

const handleSwap = () => {
  if (!inputSelect || !outputSelect) return;

  setInputSelect(outputSelect);
  setOutputSelect(inputSelect);
};


  return (
    <div className="">

      <NavbarLayout type="translate" />

      <div className="grid grid-cols-1 mx-5 my-5">
        <div className="mx-auto">
          <UploadFile 
      setText={setText}
      setLoading={setLoading}
    />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-12 mx-5">
        <div className="col-span-2 md:col-span-12 w-full">
          <div className="bg-slate-50 py-4 px-4 flex gap-3 border rounded border-slate-400 shadow-sm w-full">
            <OutputTrans
              outputSelect={outputSelect}
              setOutputSelect={setOutputSelect}
              setInputSelect={setInputSelect}
              languages={languages}
              inputSelect={inputSelect}
            />
            <button onClick={handleSwap} className="p-2 bg-white rounded-md border border-blue-300 cursor-pointer">
              <Repeat size={16} />
            </button>
            <InputTrans
              inputSelect={inputSelect}
              setInputSelect={setInputSelect}
              setOutputSelect={setOutputSelect}
              languages={languages}
              outputSelect={outputSelect}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-12 mx-5 my-1 border-slate-400 border shadow-md">
        <div className="col-span-1 md:col-span-6 w-full">
          <div className="bg-slate-50 py-4 px-4 flex flex-col gap-3 h-full">
            <textarea
              name=""
              id=""
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full border border-transparent rounded-md py-2 px-6 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter Text or OCR Result show in here"
            ></textarea>
            {text && (
              <div className="flex justify-between">
                <div className="action-left flex gap-3">
                  <button
                    onClick={() => handleClear(text)}
                    className="p-2 bg-blue-200 hover:bg-slate-200 hover:text-red-500 rounded-md cursor-pointer"
                  >
                    <RefreshCcw size={20} />
                  </button>
                  {
                    outputSelect.value !== detect ? <div onClick={() => handleChange(detect)} className="bg-transparent px-3 py-1 border border-slate-400 rounded rounded-md cursor-pointer hover:text-blue-400 hover:bg-slate-200">
                    Terjemahkan dari <span className="font-semibold">{detect}</span> 
                  </div> : <div className=""></div>
                  }
                </div>
                <div className="action-right">
                  <button
                    onClick={() => handleSoundText(text)}
                    className="p-2 bg-transparent hover:bg-slate-200 hover:text-blue-500 rounded-md cursor-pointer"
                  >
                    <Volume2 size={20} />
                  </button>
                  <button
                    onClick={() => handleCopyText(text)}
                    className="p-2 bg-transparent hover:bg-slate-200 hover:text-blue-500 rounded-md cursor-pointer"
                  >
                    <Copy size={20} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="col-span-1 md:col-span-6 w-full">
          <div className="bg-slate-50 py-4 px-4 flex flex-col gap-3 h-full">
            <textarea
              name=""
              id=""
              value={result}
              className="w-full border border-slate-400 rounded-md py-2 px-6 focus:ring-2 focus:ring-blue-500 outline-none"
              disabled
              placeholder="Translation"
            ></textarea>
            {result && (
              <div className="flex justify-between">
                <div className="action-left"></div>
                <div className="action-right">
                  <button
                    onClick={() => handleSoundText(result)}
                    className="p-2 bg-transparent hover:bg-slate-200 hover:text-blue-500 rounded-md cursor-pointer"
                  >
                    <Volume2 size={20} />
                  </button>
                  <button
                    onClick={() => handleCopyText(result)}
                    className="p-2 bg-transparent hover:bg-slate-200 hover:text-blue-500 rounded-md cursor-pointer"
                  >
                    <Copy size={20} />
                  </button>
                  <button
                    onClick={() => handleSave()}
                    className="p-2 bg-transparent hover:bg-slate-200 hover:text-blue-500 rounded-md cursor-pointer">
                    <Bookmark size={20} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
