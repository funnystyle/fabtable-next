import DataTables from "@components/DataTables";
import { useEffect, useState } from "react";
import { getPage } from "@components/StringUtil";
import { useQuery } from "@tanstack/react-query";
import { getAxios } from "@api/apiClient";
import TableOnRowSelect2 from "@pages/samples/antd/TableOnRowSelect2";

const url = "/api/v1/admin/order-info";


const DataTablePage = () => {
  const [header, setHeader] = useState(null);

  const [queryKey, setQueryKey] = useState(["headerData", Math.random()]); // 변경된 부분
  const { data:headerData, isLoading, isSuccess, isError } = useQuery({
    queryKey,
    queryFn: () => getAxios("/admin/order-info/data-table/header", {}),
  });
  const [queryKey2, setQueryKey2] = useState(["orderInfoList", Math.random()]); // 변경된 부분
  const { data:orderInfoListData, isSuccess:isSuccess2 } = useQuery({
    queryKey2,
    queryFn: () => getAxios("/admin/order-info", {}),
  });

  useEffect(() => {
    if (isSuccess) {
      setHeader(headerData);
    }
  }, [isSuccess]);

  if (!header || !isSuccess || !isSuccess2 || !headerData) {
    return <div>Loading...</div>
  }

  console.log(orderInfoListData)

  return (
    <div>
      <h1>DataTables Antd Sample (Server Side Data)</h1>
      <TableOnRowSelect2 header={header} serverData={orderInfoListData?.data?.list}/>
    </div>
  );
};

export default DataTablePage;
