import { useState, useEffect } from "react";
import { getUsers } from "../../../components/services/msuser.services";

export default function DropdownUsers({ onChange }) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data);

      onChange(0);
    };

    fetchUsers();
  }, []);

  return (
    <form className="w-40 mb-2 md:mb-0">
      <label className="sr-only">Select an option</label>

      <select
        value={selectedUser}
        onChange={(e) => {
          const value = Number(e.target.value);
          setSelectedUser(value);
          onChange(value);
        }}
        className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-slate-400 rounded-md text-heading text-sm leading-4 focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
      >
        <option value={0}>All Users</option>

        {users.map((item) => (
          <option value={item.userid} key={item.userid}>
            {item.username}
          </option>
        ))}
      </select>
    </form>
  );
}