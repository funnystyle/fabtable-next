import {useMutation} from "@tanstack/react-query";
import {postAxios} from "@api/apiClient";
import {useEffect} from "react";
import useCsSearchModalStore from "@store/useCsSearchModalStore";

export const useGetCsList = () => {
  const {
    page, size, searchKeyword, searchStatusList, searchData,
    setData,
    setList,
  } = useCsSearchModalStore();

  const { mutate: getCsList, isPending, isError, error } = useMutation({
    mutationKey: ["getCsList"],
    mutationFn: (values) => postAxios("/user/cs/search", values),
    onSuccess: (response) => {
      setData(response.data);
      setList(response.data.list);
      console.log("response.data", response.data)
    },
  });

  // 재사용 가능한 handleReload 함수 정의
  const handleReload = () => {
    getCsList({ page, size, searchKeyword, searchStatusList, searchData });
  };

  useEffect(() => {
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
