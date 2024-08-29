import DataTables from "@components/DataTables";
import data from "@data/datatables-data";

const columns = [
  { title: "Name" },
  { title: "Position" },
  { title: "Office" },
  { title: "Extn." },
  { title: "Start data" },
  { title: "Salary" },
];

const DataTablePage = () => {
  return (
    <div>
      <h1>DataTables Sample (Client Side Data)</h1>
      <DataTables columns={columns} data={data} />
    </div>
  );
};

export default DataTablePage;
