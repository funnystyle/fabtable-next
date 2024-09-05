import DataTables from "@components/DataTables";
import { useEffect, useState } from "react";
import { getPage } from "@components/StringUtil";

// const header = [
//   [
//     { title: "111", colspan: 2 },
//     { title: "222", colspan: 2 },
//     { title: "333", colspan: 2 },
//   ],
//   [
//     { title: "Name" },
//     { title: "Position" },
//     { title: "Office" },
//     { title: "Extn" },
//     { title: "Start data" },
//     { title: "Salary" },
//   ]
// ];

const header = [
    [
    { title: "aaa", colspan: 3 },
    { title: "bbb", colspan: 3 },
  ],
  [
    { title: "111", rowspan: 2 },
    { title: "222", colspan: 2 },
    { title: "333", colspan: 3 },
  ],
  [
    { title: "Position" },
    { title: "Office" },
    { title: "Extn" },
    { title: "Start data" },
    { title: "Salary" },
  ]
];

const columns = [
  { title: "Name", data: "name" },
  { title: "Position", data: "position" },
  { title: "Office", data: "office" },
  { title: "Extn", data: "extn" },
  { title: "Start data", data: "startDate" },
  { title: "Salary", data: "salary" },
];

const url = "/api/v1/user/customer/list";

const DataTablePage = () => {
  const [page, setPage] = useState(null);

  useEffect(() => {
    setPage(getPage(window.location.href));
  }, []);

  if (!page) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>DataTables Sample (Server Side Data)</h1>
      <DataTables header={header} columns={columns} url={url} page={page} />
    </div>
  );
};

export default DataTablePage;
