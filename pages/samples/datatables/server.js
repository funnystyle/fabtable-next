import DataTables from "@components/DataTables";
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from "react";
import { getPage } from "@components/StringUtil";

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
  const [page, setPage] = useState(null);

  useEffect(() => {
    setPage(getPage(window.location.href));
  }, []);

  if (!page) {
    return <div>Invalid page number</div>
  }

  return (
    <div>
      <h1>DataTables Sample (Server Side Data)</h1>
      <DataTables columns={columns} url={url} page={page} />
    </div>
  );
};

export default DataTablePage;
