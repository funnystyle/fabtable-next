import {useEffect, useState} from "react";
import { useQuery } from "@tanstack/react-query";
import { getAxios } from "@api/apiClient";

export const useGetCodeList = (groupName) => {
  const [key, setKey] = useState(Math.random());
  const queryKey = ["status-list", groupName, key];

  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useQuery({
    queryKey,
    queryFn: () => getAxios("/user/code", { groupName }),
    enabled: !!groupName, // type이 존재할 때만 요청 실행
  });

  const handleReload = () => {
    setKey(Math.random()); // queryKey 변경 → 자동 재요청
  };

  return {
    data:data?.data,
    list:data?.data?.list || [],
    codeNameList: data?.data?.list?.map((item) => item.codeName) || [],
    tooltipList: data?.data?.list?.map((item) => { return {codeName:item.codeName, tooltip:item.tooltip}}) || [],
    isLoading,
    isSuccess,
    isError,
    error,
    handleReload
  };
};
