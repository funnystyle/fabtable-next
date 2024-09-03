import DataTables from "@components/DataTables";
import data from "@data/datatables-data";
import { useSearchParams } from "next/navigation";

const columns = [
  { title: "Name" },
  { title: "Position" },
  { title: "Office" },
  { title: "Extn." },
  { title: "Start data" },
  { title: "Salary" },
];

const DataTablePage = () => {
  const searchParams = useSearchParams()
  const page = searchParams.get('page') || 1;

  return (
    <div>
      <h1>DataTables Sample (Client Side Data)</h1>
      <DataTables columns={columns} data={data} page={page}/>
    </div>
  );
};

export default DataTablePage;
