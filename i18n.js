import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";

// i18next 기본 설정
i18next
  .use(initReactI18next) // react-i18next 연동
  .init({
    lng: "en", // 기본 언어
    fallbackLng: "en", // 기본 언어가 없을 경우 사용될 언어
    interpolation: {
      escapeValue: false, // React에서는 자동으로 HTML 이스케이프 처리
    },
    react: {
      useSuspense: false, // Suspense 비활성화 (원하는 경우 활성화 가능)
    },
    resources: {}, // 초기 빈 리소스
  });

export default i18next;
