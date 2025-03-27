import { useQuery } from '@tanstack/react-query';
import i18next from 'i18next';
import { getAxios } from "@api/apiClient";

const useTranslations = (locale) => {
  // 번역 데이터가 로드된 후 강제로 언어를 변경하여 적용
  useEffect(() => {
    if (isSuccess) {
      i18next.changeLanguage(locale); // 언어 변경 후 리렌더링 트리거
    }
  }, [locale, isSuccess]);

  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ["translations", locale], // 쿼리 키
    queryFn: () => getAxios(`/translations?locale=${locale}`, {}), // 데이터 fetch 함수
    enabled: !!locale, // locale이 있을 때만 실행
    onSuccess: (data) => {
      if (data && data.length > 0) {
        const resources = {};
        data.forEach((translation) => {
          if (!resources[locale]) {
            resources[locale] = {};
          }
          resources[locale][translation.keyName] = translation.value;
        });

        // i18next에 동적으로 리소스 추가
        i18next.addResourceBundle(locale, 'translation', resources[locale], true, true);
      }
    },
    refetchOnWindowFocus: false, // 기본값은 true이지만 비활성화
    retry: false, // 실패 시 재시도 안 함
  });

  return { data, isLoading, isSuccess, isError };
};

export default useTranslations;
