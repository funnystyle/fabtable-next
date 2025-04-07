import {useMutation} from "@tanstack/react-query";
import {postBlobAxios} from "@api/apiClient";

export const useDownloadOrderListExcel = () => {
  const { mutate: downloadOrderListExcel, isPending } = useMutation({
    mutationKey: ["downloadOrderListExcel"],
    mutationFn: (values) => postBlobAxios(`/user/excel/record`, values),
    onSuccess: (data) => {
      const url = window.URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = url;
      //Stirng yyyy-mm-dd
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      link.setAttribute("download", `수주_목록_${year}${month}${day}.xlsx`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url); // 메모리 누수 방지
    },
    onError: (error) => {
      console.error("엑셀 다운로드 오류:", error);
    },
  });

  const handleDownload = (allColumns, allRows, headerDiv
                          , ids, searchKeyword, searchData, statusList) => {
    const params = {
      allColumns, allRows, headerDiv
      , ids, searchKeyword, searchData, statusList
    }

    downloadOrderListExcel(params);
  };

  return { handleDownload, isPending };
};
