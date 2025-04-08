import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAxios } from "@api/apiClient";

export const useGetRecordDetail = (id) => {
  const [key, setKey] = useState(Math.random());
  const queryKey = ["record-detail", id, key];

  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useQuery({
    queryKey,
    queryFn: () => getAxios(`/user/record/${id}`),
    enabled: !!id,
  });

  const handleReload = () => {
    setKey(Math.random()); // queryKey 변경 → 자동 재요청
  };

  return {
    data:data?.data,
    isLoading,
    isSuccess,
    isError,
    error,
    handleReload
  };
};
