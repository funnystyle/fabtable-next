import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAxios } from "@api/apiClient";

export const useGetInputBoxList = (type) => {
  const [key, setKey] = useState(Math.random());
  const queryKey = ["input-box-list", type, key];

  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useQuery({
    queryKey,
    queryFn: () => getAxios("/user/input-box", { type }),
    enabled: !!type, // type이 존재할 때만 요청 실행
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
