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


const defaultHeader = [
    [
    { title: "aaa", colspan: 3 },
    { title: "bbb", colspan: 3 },
  ],
  [
    { title: "Name", rowspan: 2 },
    { title: "222", colspan: 2 },
    { title: "333", colspan: 2 },
    { title: "Salary", rowspan: 2 },
  ],
  [
    { title: "Position" },
    { title: "Office" },
    { title: "Extn" },
    { title: "StartDate" },
  ]
];

const defaultColumns = [
  { title: "Name", data: "name" },
  { title: "Position", data: "position" },
  { title: "Office", data: "office" },
  { title: "Extn", data: "extn" },
  { title: "StartDate", data: "startDate" },
  { title: "Salary", data: "salary" },
];

const url = "/api/v1/user/customer/list";

const DataTablePage = () => {
  const [page, setPage] = useState(null);
  const [header, setHeader] = useState(null);
  const [columns, setColumns] = useState(null);

  useEffect(() => {
    setPage(getPage(window.location.href));

    // localStorage.setItem('tableHeader', null);
    // localStorage.setItem('tableColumns', null);
    const savedHeader = JSON.parse(localStorage.getItem('tableHeader'));
    setHeader(savedHeader ? savedHeader : defaultHeader);
    const savedColumns = JSON.parse(localStorage.getItem('tableColumns'));
    setColumns(savedColumns ? savedColumns : defaultColumns);

  }, []);

  if (!page || !header || !columns) {
    return <div>Loading...</div>
  }

  console.log("header",header);

  return (
    <div>
      <h1>DataTables Sample (Server Side Data)</h1>
      <DataTables header={header} columns={columns} url={url} page={page} />
    </div>
  );
};

export default DataTablePage;
