import SidebarLayouts from "../../../components/Layouts/SidebarLayouts";
import Breadcrumb from "../../../components/Fragments/Breadcrumb";
import Table from "../Fragments/Table";
import mockData from "../api/data.json";
import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import {
  deleteUser,
  getUsers,
} from "../../../components/services/msuser.services";
import "../../../components/Elements/Modal/index";
import Modal from "../../../components/Elements/Modal";
import FormUser from "./FormUser";
import { Info, Edit, Trash, PlusCircle } from "react-feather";

const columnHelper = createColumnHelper();

const TableUser = () => {
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("add");
  const [selectedUserId, setSelectedUserId] = useState(null);
  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data);
      console.log(data);
    };
    fetchUsers();
  }, []);
  console.log(users);

  const handleDelete = (userid) => {
    deleteUser(userid);
  };

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: () => <span className="flex items-center">Number</span>,
      cell: ({ row }) => row.index + 1,
    }),
    columnHelper.accessor("username", {
      cell: (info) => info.getValue(),
      header: () => <span className="flex items-center">Username</span>,
    }),
    columnHelper.accessor("email", {
      cell: (info) => info.getValue(),
      header: () => <span className="flex items-center">Email</span>,
    }),
    columnHelper.accessor("password", {
      cell: (info) => info.getValue(),
      header: () => <span className="flex items-center">Password</span>,
    }),
    columnHelper.accessor("role", {
      cell: (info) => (info.getValue() === "1" ? "User" : "Admin"),
      header: () => <span className="flex items-center">Role</span>,
    }),
    columnHelper.accessor("action", {
      header: () => <span className="flex items-center">Actions</span>,
      cell: ({ row }) => {
        const user = row.original;

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
              type="button"
              onClick={() => {
                setTitle("Edit User");
                setType("edit");
                setSelectedUserId(user.userid);
                setModal(true);
              }}
            >
              <Edit size={20} />
            </button>

            <button
              onClick={() => handleDelete(user.userid)}
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
    <SidebarLayouts type="user">
      <Breadcrumb type="Data User" subtype="-" />

      <div className="grid grid-cols-1 md:grid-cols-12">
        <div className="col-span-12 mx-5 mb-5">
          <div className="rounded-md shadow-md p-3 border-slate-300 border">
            <div className="flex justify-between">
              <h1 className="font-semibold text-xl">Data User</h1>

              <button
                type="button"
                onClick={() => {
                  setTitle("Add User");
                  setType("add");
                  setSelectedUserId(null);
                  setModal(true);
                }}
                className="px-3 py-1.5 text-white bg-blue-500 hover:bg-blue-600 rounded-md flex gap-2 cursor-pointer"
              >
                <PlusCircle />
                Add User
              </button>
            </div>
            <hr className="my-2" />

            <div className="w-full">
              {modal && (
                <Modal closeModal={setModal} title={title}>
                  <FormUser type={type} userid={selectedUserId} />
                </Modal>
              )}

              <Table data={users} columns={columns} />
            </div>
          </div>
        </div>
      </div>
    </SidebarLayouts>
  );
};

export default TableUser;
