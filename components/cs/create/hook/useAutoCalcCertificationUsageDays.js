import { useEffect, useRef } from "react";
import dayjs from "dayjs";

/**
 * 제품 인증일 기준으로 사용일 수를 자동 계산하는 훅
 * @param {object} form - antd Form 인스턴스
 * @param {number|string} index - 현재 row 인덱스 또는 키
 * @param {array} deps - 감시할 watch 값 배열
 */
function useAutoCalcCertificationUsageDays(form, index, deps) {
  const prevValueRef = useRef(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const certificateDate = form.getFieldValue(`productCertificationDate-${index}`);
      if (!certificateDate) return;

      const today = dayjs().startOf("day");
      const cert = dayjs(certificateDate).startOf("day");
      const diff = today.diff(cert, "day");

      if (diff !== prevValueRef.current) {
        form.setFieldValue(`certificationDateUsageDays-${index}`, diff);
        prevValueRef.current = diff;
      }
    });

    return () => cancelAnimationFrame(frame);
  }, deps);
}

export default useAutoCalcCertificationUsageDays;
