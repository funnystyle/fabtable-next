import { useMutation } from "@tanstack/react-query";
import { deleteAxios } from "@api/apiClient";
import { message, Modal } from "antd";
import { useEffect, useState } from "react";

export const useDeleteRecord = (ifSuccess, multipleDelete = false) => {

  const { mutate: deleteRecord } = useMutation({
    mutationKey: "deleteRecord",
    mutationFn: (values) => deleteAxios(`/user/record/${values.id}`),
    onSuccess: () => {
      if (!multipleDelete) message.success('삭제 완료되었습니다');
      if (ifSuccess) ifSuccess();

      setDeletedCount((prevCount) => prevCount + 1);
    },
    onError: (error) => {
      message.error('삭제 실패. 잠시 후 다시 시도해주세요');
      console.log("error", error)
    }
  });

  const [deleteCount, setDeleteCount] = useState(0);
  const [deletedCount, setDeletedCount] = useState(0);

  const multipleDeleteRecord = (ids) => {
    if (ids.length === 0) {
      message.error("삭제할 항목을 선택해주세요");
      return;
    }
    setDeleteCount(ids.length);
    Modal.confirm({
      title: "삭제하기",
      content: "선택한 수주 정보를 삭제하시겠습니까?",
      onOk: () => {
        ids.forEach((id) => {
          deleteRecord({ id });
        });
      },
    });
  }
  useEffect(() => {
    if (deleteCount > 0 && deleteCount === deletedCount) {
      message.success('총 ' + deleteCount + '건 삭제되었습니다');
      setDeleteCount(0);
      setDeletedCount(0);
    }
  }, [deletedCount]);

  return {
    mutate: deleteRecord,
    multipleDeleteRecord,
  }
};
