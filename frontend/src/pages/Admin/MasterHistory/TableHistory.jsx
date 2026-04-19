import SidebarLayouts from "../../../components/Layouts/SidebarLayouts";
import Breadcrumb from "../../../components/Fragments/Breadcrumb";
import Table from "../Fragments/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { getHistory } from "../../../components/services/history.services";
import "../../../components/Elements/Modal/index";
import Modal from "../../../components/Elements/Modal";
import FormLang from "./FormHistory";
import { jwtDecode } from "jwt-decode";
import { Info, Edit, Trash, PlusCircle, Printer, Download } from "react-feather";
import jsPDF from "jspdf";
import 'jspdf-autotable'
import DropdownUsers from "./DropdownUsers";

const columnHelper = createColumnHelper();

const TableLang = () => {
  const [history, setHistory] = useState([]);
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("add");
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedLanguageId, setSelectedLanguageId] = useState(null);
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  useEffect(() => {
    const fetchLang = async () => {
      const data = await getHistory();
      setHistory(data);
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
    };
    fetchLang();
  }, []);

  useEffect(() => {
    if (selectedUserId === 0) {
      setFilteredHistory(history);
    } else {
      const result = history.filter((item) => item.userid === selectedUserId);
      setFilteredHistory(result);
    }
  }, [selectedUserId, history]);

  const columns = [
    columnHelper.accessor("historyid", {
      header: () => <span className="flex items-center">Number</span>,
      cell: ({ row }) => row.index + 1,
    }),

    columnHelper.accessor("language_input", {
      header: () => <span className="flex items-center">Language Input</span>,
    }),

    columnHelper.accessor("language_result", {
      header: () => <span className="flex items-center">Language Result</span>,
    }),

    columnHelper.accessor("userid", {
      header: () => <span className="flex items-center">UserID</span>,
    }),

    columnHelper.accessor("ocr_text", {
      header: () => <span className="flex items-center">Text Input</span>,
      cell: (info) => <textarea defaultValue={info.getValue()} />,
    }),

    columnHelper.accessor("translated_text", {
      header: () => <span className="flex items-center">Text Result</span>,
      cell: (info) => <textarea defaultValue={info.getValue()} />,
    }),

    columnHelper.accessor("action", {
      id: "action",
      header: () => <span className="flex items-center">Actions</span>,
      cell: ({ row }) => {
        const history = row.original;

        return (
          <div className="flex gap-2">
            <button
              onClick={() => row.toggleExpanded()}
              className="p-1.5 bg-blue-500 text-white rounded-md cursor-pointer"
            >
              <Info size={20} />
            </button>

            <button
              className="p-1.5 bg-yellow-500 text-white rounded-md cursor-pointer"
              onClick={() => generatePDFrow(history)}
            >
              <Printer size={20} />
            </button>
          </div>
        );
      },
    }),
  ];

  const generatePDF = () => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const addHeader = () => {
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("HISTORY TRANSLATION REPORT", pageWidth / 2, 15, { align: "center" });

    doc.setDrawColor(0);
    doc.line(14, 20, pageWidth - 14, 20);
  };

  const addFooter = () => {
    const pageCount = doc.internal.getNumberOfPages();
    const today = new Date().toLocaleString();

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Generated: ${today}`, 14, pageHeight - 10);
    doc.text(`Page ${pageCount}`, pageWidth - 20, pageHeight - 10);
  };

  addHeader();

  let y = 30;

  history.forEach((item, index) => {
    if (y > pageHeight - 30) {
      doc.addPage();
      addHeader();
      y = 30;
    }

    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.text(`History #${index + 1}`, 14, y);
    y += 8;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    const inputText = doc.splitTextToSize(`Input Text: ${item.ocr_text}`, pageWidth - 28);
    doc.text(inputText, 14, y);
    y += inputText.length * 6;

    const resultText = doc.splitTextToSize(`Result: ${item.translated_text}`, pageWidth - 28);
    doc.text(resultText, 14, y);
    y += resultText.length * 6;

    doc.text(`Language Input : ${item.language_input}`, 14, y);
    y += 6;

    doc.text(`Language Result: ${item.language_result}`, 14, y);
    y += 10;

    doc.setDrawColor(200);
    doc.line(14, y, pageWidth - 14, y);
    y += 10;
  });

  addFooter();
  doc.save("history-report.pdf");
};


  const generatePDFrow = (history) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const addHeader = () => {
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("HISTORY DETAIL REPORT", pageWidth / 2, 15, { align: "center" });
    doc.line(14, 20, pageWidth - 14, 20);
  };

  const addFooter = () => {
    const today = new Date().toLocaleString();
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Generated: ${today}`, 14, pageHeight - 10);
    doc.text(`History ID: ${history.historyid}`, pageWidth - 60, pageHeight - 10);
  };

  addHeader();

  let y = 35;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text(`History ID: ${history.historyid}`, 14, y);
  y += 10;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);

  const inputText = doc.splitTextToSize(`Input Text: ${history.ocr_text}`, pageWidth - 28);
  doc.text(inputText, 14, y);
  y += inputText.length * 6;

  const resultText = doc.splitTextToSize(`Result: ${history.translated_text}`, pageWidth - 28);
  doc.text(resultText, 14, y);
  y += resultText.length * 6;

  doc.text(`Language Input : ${history.language_input}`, 14, y);
  y += 6;

  doc.text(`Language Result: ${history.language_result}`, 14, y);
  y += 10;

  addFooter();
  doc.save(`history-${history.historyid}.pdf`);
};


  return (
    <SidebarLayouts type="history">
      <Breadcrumb type="Data History" subtype="-" />

      <div className="grid grid-cols-1 md:grid-cols-12">
        <div className="col-span-12 mx-5 mb-5">
          <div className="rounded-md shadow-md p-3 border-slate-300 border">
            <div className="flex justify-between">
              <h1 className="font-semibold text-xl">Data History</h1>

              <div className="column md:flex gap-3">
                <DropdownUsers onChange={(id) => setSelectedUserId(id)} />

                <button
                  type="button"
                  onClick={generatePDF}
                  className="px-3 py-2 align-items-center text-white bg-green-500 hover:bg-green-600 rounded-md flex gap-2 cursor-pointer"
                >
                  <Download size={20} /> Download PDF
                </button>
              </div>
            </div>
            <hr className="my-2" />

            <div className="w-full">
              {modal && (
                <Modal closeModal={setModal} title={title}>
                  <FormLang type={type} languageid={selectedLanguageId} />
                </Modal>
              )}

              <Table data={filteredHistory} columns={columns} />
            </div>
          </div>
        </div>
      </div>
    </SidebarLayouts>
  );
};

export default TableLang;
