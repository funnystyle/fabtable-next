import { useMutation } from "@tanstack/react-query";
import { postAxios } from "@api/apiClient";
import useRecordModalStore from "@store/useRecordModalStore";
import { useEffect } from "react";

export const useGetRecords = () => {
  const {
    page, size, searchKeyword, searchStatusList, searchData,
    setData, setList, setTotal,
  } = useRecordModalStore();

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
    getRecords({ page, size, searchKeyword, statusList:searchStatusList, searchData });
  };

  useEffect(() => {
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
