import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAxios } from "@api/apiClient";

export const useGetMgmrBinList = () => {
  const [key, setKey] = useState(Math.random());
  const queryKey = ["mgmr-bin", key];

  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useQuery({
    queryKey,
    queryFn: () => getAxios("/user/mgmr-bin"),
  });

  const handleReload = () => {
    setKey(Math.random()); // queryKey 변경 → 자동 재요청
  };

  return {
    data:data?.data,
    list:data?.data?.list || [],
    isLoading,
    isSuccess,
    isError,
    error,
    handleReload
  };
};
