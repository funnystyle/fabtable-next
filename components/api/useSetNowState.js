import {useMutation} from "@tanstack/react-query";
import {postAxios, putAxios} from "@api/apiClient";
import {useEffect, useRef} from "react";
import useCsSearchModalStore from "@store/useCsSearchModalStore";
import {message} from "antd";

export const useSetNowState = (handleListReload) => {

  const { mutate: nowStateChange } = useMutation({
    mutationKey: "nowStateChange",
    mutationFn: (values) => putAxios("/user/record", values),
    onSuccess: () => {
      setTimeout(() => {
        message.success('변경 완료');
        handleListReload();
      }, 100);
    },
    onError: (error) => {
      message.error('변경 실패');
      console.log("error", error)
    }
  });

  // 재사용 가능한 handleReload 함수 정의
  const handleReload = (ids, nowState) => {
    nowStateChange({ids, nowState });
  };

  return {
    handleReload
  };
};
