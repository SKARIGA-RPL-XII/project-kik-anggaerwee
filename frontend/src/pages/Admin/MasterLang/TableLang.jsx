import SidebarLayouts from "../../../components/Layouts/SidebarLayouts";
import Breadcrumb from "../../../components/Fragments/Breadcrumb";
import Table from "../Fragments/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import {
  deleteLanguage,
  getLanguage,
} from "../../../components/services/mslang.services";
import "../../../components/Elements/Modal/index";
import Modal from "../../../components/Elements/Modal";
import FormLang from "./FormLang";
import { jwtDecode } from "jwt-decode";
import { data } from "react-router-dom";
import { Info, Edit, Trash, PlusCircle } from "react-feather";

const columnHelper = createColumnHelper();

const TableLang = () => {
  const [language, setLanguage] = useState([]);
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("add");
  const [selectedLanguageId, setSelectedLanguageId] = useState(null);
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  useEffect(() => {
    const fetchLang = async () => {
      const data = await getLanguage();
      setLanguage(data);
      setSelectedLanguageId(data.languageid);
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
    };
    fetchLang();
  }, []);

  const handleDelete = (languageid) => {
    deleteLanguage(languageid);
  };

  const columns = [
    columnHelper.accessor("languageid", {
      header: () => <span className="flex items-center">Number</span>,
      cell: ({ row }) => row.index + 1,
    }),

    columnHelper.accessor("languagenm", {
      header: () => <span className="flex items-center">Language Name</span>,
    }),

    columnHelper.accessor("langcode", {
      header: () => <span className="flex items-center">Languge Code</span>,
    }),

    columnHelper.accessor("isactive", {
      header: () => <span className="flex items-center">Isactive</span>,
      cell: (info) => (info.getValue() === true ? "Active" : "Inactive"),
    }),

    columnHelper.accessor("action", {
      id: "action",
      header: () => <span className="flex items-center">Actions</span>,
      cell: ({ row }) => {
        const language = row.original;

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
              onClick={() => {
                setTitle("Edit Language");
                setType("edit");
                setModal(true);
                setSelectedLanguageId(language.languageid);
              }}
            >
              <Edit size={20} />
            </button>

            <button
              onClick={() => handleDelete(language.languageid)}
              className="p-1.5 bg-red-500 text-white rounded-md cursor-pointer"
            >
              <Trash size={20} />
            </button>
          </div>
        );
      },
    }),
  ];

  return (
    <SidebarLayouts type="language">
      <Breadcrumb type="Data Language" subtype="-" />

      <div className="grid grid-cols-1 md:grid-cols-12">
        <div className="col-span-12 mx-5 mb-5">
          <div className="rounded-md shadow-md p-3 border-slate-300 border">
            <div className="flex justify-between">
              <h1 className="font-semibold text-xl">Data Language</h1>

              <button
                type="button"
                onClick={() => {
                  setTitle("Add Language");
                  setType("add");
                  setModal(true);
                  // setSelectedLanguageId(null);
                }}
                className="px-3 py-1.5 text-white bg-blue-500 hover:bg-blue-600 rounded-md flex gap-2 cursor-pointer"
              >
                <PlusCircle />
                Add Language
              </button>
            </div>
            <hr className="my-2" />

            <div className="w-full">
              {modal && (
                <Modal closeModal={setModal} title={title}>
                  <FormLang type={type} languageid={selectedLanguageId} />
                </Modal>
              )}

              <Table data={language} columns={columns} />
            </div>
          </div>
        </div>
      </div>
    </SidebarLayouts>
  );
};

export default TableLang;
