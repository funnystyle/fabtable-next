import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useTranslations from "@hooks/useTranslations";

const Home = () => {
  const [locale, setLocale] = useState("en"); // 현재 언어 상태
  const { t } = useTranslation(); // useTranslation 훅을 사용하여 번역된 텍스트 가져오기

  // 번역 데이터를 불러오는 커스텀 훅
  const { isLoading, error } = useTranslations(locale);

  useEffect(() => {
    // 예시로 언어를 바꾸는 로직 (원하는 방식으로 구현 가능)
    setTimeout(() => setLocale("ko"), 2000); // 2초 후에 언어 변경
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading translations!</div>;

  return (
    <div>
      <h1>{t("welcome.message")}</h1>
      <button>{t("button.save")}</button>
    </div>
  );
};

export default Home;
