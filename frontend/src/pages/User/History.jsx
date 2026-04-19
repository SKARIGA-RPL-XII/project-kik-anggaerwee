import { useEffect, useState } from "react";
import NavbarLayouts from "../../components/Layouts/NavbarLayouts";
import jsPDF from "jspdf";
import {
  Repeat,
  Copy,
  Bookmark,
  Printer,
  Trash,
  ChevronDown,
  ChevronRight,
} from "react-feather";
import {
  listHistory,
  deleteHistory,
} from "../../components/services/history.services";
import { jwtDecode } from "jwt-decode";

const History = () => {
  const [histories, setHistories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");


  const handleDelete = async (historyid) => {
  deleteHistory(historyid)
};

const generatePDF = (item) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const addHeader = () => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("HISTORY TRANSLATION REPORT", pageWidth / 2, 15, {
      align: "center",
    });

    doc.line(14, 20, pageWidth - 14, 20);
  };

  const addFooter = () => {
    const today = new Date().toLocaleString();

    doc.setFontSize(10);
    doc.text(`Generated: ${today}`, 14, pageHeight - 10);
  };

  addHeader();

  let y = 30;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text(`History ID: ${item.historyid}`, 14, y);
  y += 10;

  doc.setFont("helvetica", "normal");

  const inputText = doc.splitTextToSize(
    `Input Text: ${item.ocr_text || "-"}`,
    pageWidth - 28
  );
  doc.text(inputText, 14, y);
  y += inputText.length * 6;

  const resultText = doc.splitTextToSize(
    `Result: ${item.translated_text || "-"}`,
    pageWidth - 28
  );
  doc.text(resultText, 14, y);
  y += resultText.length * 6;

  doc.text(`Language Input: ${item.language_input}`, 14, y);
  y += 6;

  doc.text(`Language Result: ${item.language_result}`, 14, y);
  y += 6;

  doc.text(`Created: ${item.createddate}`, 14, y);

  doc.text

  addFooter();

  const pdfBlob = doc.output("blob");
  const url = URL.createObjectURL(pdfBlob);
  window.open(url); // buka di tab baru
};



  useEffect(() => {
  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const decoded = jwtDecode(token);
      const response = await listHistory(decoded.userid, selectedDate);

      setHistories(response || []);
    } catch (err) {
      console.error("Error fetching history:", err);
    }finally {
        setLoading(false);
      }
  };

  fetchHistory();
}, [selectedDate]);


  if (loading) return <div className="p-5 text-center">Loading...</div>;

  return (
    <div className="">
      <NavbarLayouts type="history" />

      <div className="relative max-w-sm my-5 mx-5">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <ChevronDown size={24} />
        </div>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="block w-full ps-9 pe-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand px-3 py-2.5 shadow-xs"
          placeholder="Select date"
        />
      </div>

      {histories.length > 0 ? (
        histories.map((item) => (
          <div
            key={item.historyid}
            className="grid grid-cols-2 lg:grid-cols-12 mx-5 my-5 border-slate-400 border shadow-md"
          >
            <div className="col-span-1 md:col-span-6 w-full">
              <div className="bg-slate-50 py-4 px-4 flex flex-col gap-1 h-full">
                <textarea
                  value={item.ocr_text || ""}
                  className="w-full border border-slate-200 rounded-md py-2 px-6 bg-white"
                  readOnly
                />
                <div className="flex gap-3">
                  <p className="text-xs ">{item.language_result}</p>
                  <ChevronRight size={15}  />
                <p className="text-xs ">{item.language_input}</p>
                </div>
              </div>
            </div>

            <div className="col-span-1 md:col-span-5 w-full">
              <div className="bg-slate-50 py-4 px-4 flex flex-col gap-1 h-full">
                <textarea
                  value={item.translated_text || ""}
                  className="w-full border border-slate-400 rounded-md py-2 px-6 bg-white"
                  readOnly
                />
                <p className="text-xs text-slate-500">{item.createddate}</p>
              </div>
            </div>

            <div className="col-span-2 md:col-span-1">
              <div className="bg-slate-50 py-4 px-4 flex flex-col gap-3 h-full justify-center text-hidden lg:text-block">
                <button 
                  onClick={() => generatePDF(item)}
                  className="px-2 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition flex gap-2 cursor-pointer">
                  <Printer size={20} /> PrintPDF
                </button>
                <button
                  onClick={() => handleDelete(item.historyid)}
                  className="px-2 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 transition flex gap-2 cursor-pointer"
                >
                  <Trash size={20} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="mx-5 text-gray-500">No data available in history</div>
      )}
    </div>
  );
};

export default History;
