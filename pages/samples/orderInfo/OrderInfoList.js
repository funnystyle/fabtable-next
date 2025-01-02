import DataTables from "@components/DataTables";
import { useEffect, useState } from "react";
import { getPage } from "@components/StringUtil";
import { useQuery } from "@tanstack/react-query";
import { getAxios } from "@api/apiClient";

const url = "/api/v1/admin/order-info/data-table";


const DataTablePage = () => {
  const [page, setPage] = useState(null);
  const [header, setHeader] = useState(null);
  const [columns, setColumns] = useState(null);

  const [queryKey, setQueryKey] = useState(["headerData", Math.random()]); // 변경된 부분
  const { data:headerData, isLoading, isSuccess, isError } = useQuery({
    queryKey,
    queryFn: () => getAxios("/admin/order-info/data-table/header", {}),
  });

  useEffect(() => {
    setPage(getPage(window.location.href));

    localStorage.setItem('tableHeader', null);
    localStorage.setItem('tableColumns', null);

  }, []);

  useEffect(() => {
    console.log("isSuccess : ", isSuccess);
    if (isSuccess) {
      console.log("headerData : ", headerData);
      const savedHeader = JSON.parse(localStorage.getItem('tableHeader'));
      setHeader(savedHeader ? savedHeader : [headerData]);
      const savedColumns = JSON.parse(localStorage.getItem('tableColumns'));
      setColumns(savedColumns ? savedColumns : headerData);
    }
  }, [isSuccess]);

  if (!page || !header || !columns || !isSuccess || !headerData) {
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
