import { useMutation } from "@tanstack/react-query";
import { postAxios } from "@api/apiClient";
import { useEffect, useRef } from "react";

export const useGetRecordsJoinCS = (modalStore, statusAll=false, autoReload=true) => {
  const {
    page, size, setSize, searchKeyword, searchStatusList, searchData,
    setData, setList, setTotal, reloadFlag
  } = modalStore();

  const { mutate: getRecordsJoinCs, isPending, isError, error } = useMutation({
    mutationKey: ["getRecordsJoinCs"],
    mutationFn: (values) => postAxios("/user/record/search/cs", values),
    onSuccess: (response) => {
      setData(response.data);
      setList(response.data.list);
      setTotal(response.data.total);
      console.log("response.data", response.data)
    },
  });

  // 재사용 가능한 handleReload 함수 정의
  const handleReload = () => {
    if (searchStatusList.length === 0 && !statusAll) {
      return;
    }
    getRecordsJoinCs({ page, size, searchKeyword, statusList:searchStatusList, searchData });
  };

  useEffect(() => {
    const savePageSize = localStorage.getItem("tablePageSize");
    let pageSize;
    if (savePageSize) {
      pageSize = Number(savePageSize);
      setSize(pageSize);
    }
  }, []);

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
    getRecordsJoinCs,
    handleReload,
    isPending,
    isError,
    error,
  };
};
