import {useMutation} from "@tanstack/react-query";
import {postAxios} from "@api/apiClient";
import useDocxUrlStore from "@store/useDocxUrlStore";

export const useGetDocxUrl = (certificateId) => {

  const { setDocxUrlList } = useDocxUrlStore();

  const { mutate: getDocxUrl, isPending } = useMutation({
    mutationKey: ["getDocxUrl", certificateId],
    mutationFn: (values) => postAxios(`/user/print/certificate/${certificateId}`, values),
    onSuccess: (response) => {
      let url = response?.data?.url;
      if (typeof url !== "string") {
        console.error("서버에서 URL을 반환하지 않았습니다.");
        return;
      }

      console.log("서버에서 받은 DOCX URL:", url);

      setDocxUrlList([url]);
    }
  });

  // 재사용 가능한 handleReload 함수 정의
  const handleReload = (ids) => {
    getDocxUrl({list:ids});
  };

  return {
    handleReload, isPending
  };
};
