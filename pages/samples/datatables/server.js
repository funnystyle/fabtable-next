import DataTables from "@components/DataTables";

const columns = [
  { title: "Name", data: "name", name: "name" },
  { title: "Position", data: "position", name: "position" },
  { title: "Office", data: "office", name: "office" },
  { title: "Extn.", data: "extn", name: "extn" },
  { title: "Start data", data: "startDate", name: "startDate" },
  { title: "Salary", data: "salary", name: "salary" },
];

const url = "/api/v1/user/customer/list";

const DataTablePage = () => {
  return (
    <div>
      <h1>DataTables Sample (Server Side Data)</h1>
      <DataTables columns={columns} url={url} />
    </div>
  );
};

export default DataTablePage;
