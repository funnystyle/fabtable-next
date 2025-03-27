import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAxios } from "@api/apiClient";

export const useGetCsDetail = () => {
  const [id, setId] = useState(null);
  const [key, setKey] = useState(Math.random());
  const queryKey = ["cs-detail", id, key];

  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useQuery({
    queryKey,
    queryFn: () => getAxios(`/user/cs/${id}`),
    enabled: !!id, // 자동실행 안함
  });

  const handleReload = (id) => {
    setId(id);
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
