import {useMutation} from "@tanstack/react-query";
import {deleteAxios} from "@api/apiClient";
import {message} from "antd";
import {useState} from "react";

export const useDeleteRecord = (ifSuccess) => {

  const { mutate: deleteRecord } = useMutation({
    mutationKey: "deleteRecord",
    mutationFn: (values) => deleteAxios(`/user/record/${values.id}`),
    onSuccess: () => {
      message.success('삭제 완료되었습니다');
      if (ifSuccess) ifSuccess();
    },
    onError: (error) => {
      message.error('삭제 실패. 잠시 후 다시 시도해주세요');
      console.log("error", error)
    }
  });

  return {
    mutate:deleteRecord
  }
};
