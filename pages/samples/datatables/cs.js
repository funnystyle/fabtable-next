import DataTables from "@components/DataTables";
import { useEffect, useState } from "react";
import { getPage } from "@components/StringUtil";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@api/apiClient";
import { getAxios } from "@components/AxiosCall";

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

const url = "/api/v1/cs";


const DataTablePage = () => {
  const [page, setPage] = useState(null);
  const [header, setHeader] = useState(null);
  const [columns, setColumns] = useState(null);

  const [queryKey, setQueryKey] = useState(["csHeader", Math.random()]); // 변경된 부분
  const { data:csHeader, isLoading, isSuccess, isError } = useQuery({
    queryKey,
    queryFn: () => getAxios("/api/v1/cs/header", {}),
  });

  useEffect(() => {
    setPage(getPage(window.location.href));

    localStorage.setItem('tableHeader', null);
    localStorage.setItem('tableColumns', null);

  }, []);

  useEffect(() => {
    console.log("isSuccess : ", isSuccess);
    if (isSuccess) {
      console.log("csHeader : ", csHeader);
      const savedHeader = JSON.parse(localStorage.getItem('tableHeader'));
      setHeader(savedHeader ? savedHeader : [csHeader]);
      const savedColumns = JSON.parse(localStorage.getItem('tableColumns'));
      setColumns(savedColumns ? savedColumns : csHeader);
    }
  }, [isSuccess]);

  if (!page || !header || !columns || !isSuccess || !csHeader) {
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
