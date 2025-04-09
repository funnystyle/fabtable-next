import { useEffect, useRef } from "react";
import dayjs from "dayjs";

/**
 * 분석 완료일과 요청일을 기준으로 TAT 자동 계산하는 훅
 * @param {object} form - antd form 인스턴스
 * @param {number|string} index - 행 인덱스 또는 키
 * @param {array} deps - watch 값들 (analysisCompleteDate, analysisRequestDate 등)
 */
function useAutoCalcTat(form, index, deps) {
  const prevTatRef = useRef(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const completeDate = form.getFieldValue(`analysisCompleteDate-${index}`);
      const requestDate = form.getFieldValue(`analysisRequestDate-${index}`);

      if (completeDate && requestDate) {
        const tat = dayjs(completeDate).diff(dayjs(requestDate), "day");

        if (tat !== prevTatRef.current) {
          form.setFieldValue(`tat-${index}`, tat);
          prevTatRef.current = tat;
        }
      } else {
        if (prevTatRef.current !== "") {
          form.setFieldValue(`tat-${index}`, "");
          prevTatRef.current = "";
        }
      }
    });

    return () => cancelAnimationFrame(frame);
  }, deps); // 반드시 배열로 전달
}

export default useAutoCalcTat;
