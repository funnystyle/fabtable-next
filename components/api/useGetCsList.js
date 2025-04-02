import {useMutation} from "@tanstack/react-query";
import {postAxios} from "@api/apiClient";
import {useEffect, useRef} from "react";
import useCsSearchModalStore from "@store/useCsSearchModalStore";

export const useGetCsList = (statusAll=false, autoReload=true) => {
  const {
    page, size, searchKeyword, searchStatusList, searchData,
    setData, setList, setTotal,
  } = useCsSearchModalStore();

  const { mutate: getCsList, isPending, isError, error } = useMutation({
    mutationKey: ["getCsList"],
    mutationFn: (values) => postAxios("/user/cs/search", values),
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
    getCsList({ page, size: (savePageSize ? pageSize : size), searchKeyword, searchStatusList, searchData });
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
    getCsList,
    handleReload,
    isPending,
    isError,
    error,
  };
};
