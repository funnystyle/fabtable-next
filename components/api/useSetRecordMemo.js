import { useMutation } from "@tanstack/react-query";
import { putAxios } from "@api/apiClient";
import { message } from "antd";

export const useSetRecordMemo = () => {

  const { mutate: memoUpdate } = useMutation({
    mutationKey: "memoUpdate",
    mutationFn: (values) => putAxios("/user/record", values),
    onSuccess: () => {
      setTimeout(() => {
        message.success('저장 완료');
      }, 100);
    },
    onError: (error) => {
      message.error('저장 실패');
      console.log("error", error)
    }
  });

  // 재사용 가능한 handleReload 함수 정의
  const recordMemoUpdate = (ids, salesTeamMemo, produceTeamMemo, qcTeamMemo) => {
    memoUpdate({ids, salesTeamMemo, produceTeamMemo, qcTeamMemo });
  };

  return {
    recordMemoUpdate
  };
};
