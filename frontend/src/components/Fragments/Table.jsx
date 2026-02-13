import DataTable from "react-data-table-component"
const Table = () => {
    const columns = [
        {
            name: "No",
            selector: row => row.no 
        },
        {
            name: "Username",
            selector: row => row.username 
        },
        {
            name: "Email",
            selector: row => row.Email 
        },
        {
            name: "Role",
            selector: row => row.role 
        },
        {
            name: "Password",
            selector: row => row.password 
        },

    ]

    const data = [
        {
            id: 1,
            username: "Angga",
            email: "angga@gmail.com",
            role: "User",
            password: "-",
        },
        {
            id: 1,
            username: "Angga",
            email: "angga@gmail.com",
            role: "User",
            password: "-",
        },
        {
            id: 1,
            username: "Angga",
            email: "angga@gmail.com",
            role: "User",
            password: "-",
        },
    ]
    return (
        <DataTable
        columns={columns}
        data={data}></DataTable>
    )
}

export default Table