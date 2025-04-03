import { useMutation } from "@tanstack/react-query";
import { postAxios } from "@api/apiClient";
import { useEffect, useRef } from "react";

export const useGetRecords = (modalStore, statusAll=false, autoReload=true) => {
  const { page, size, searchKeyword, searchStatusList, searchData, setData, setList, setTotal } = modalStore();

  const { mutate: getRecords, isPending, isError, error } = useMutation({
    mutationKey: ["getRecords"],
    mutationFn: (values) => postAxios("/user/record/search", values),
    onSuccess: (response) => {
      setData(response.data);
      setList(response.data.list);
      setTotal(response.data.total);
      console.log("response.data", response.data)
    },
  });

  // 재사용 가능한 handleReload 함수 정의
  const handleReload = () => {
    const savePageSize = localStorage.getItem("tablePageSize");
    let pageSize;
    if (savePageSize) {
      pageSize = Number(savePageSize);
    }
    if (searchStatusList.length === 0 && !statusAll) {
      return;
    }
    getRecords({ page, size: (savePageSize ? pageSize : size), searchKeyword, statusList:searchStatusList, searchData });
  };

  const isFirstRender = useRef(autoReload);

  useEffect(() => {
    if (!isFirstRender.current) {
      setTimeout(() => {
        isFirstRender.current = true;
      }, 0);
      return;
    }

    handleReload();
  }, [page, size, searchKeyword, searchStatusList, searchData]);

  return {
    getRecords,
    handleReload,
    isPending,
    isError,
    error,
  };
};
