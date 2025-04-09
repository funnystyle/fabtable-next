import { useEffect, useRef } from "react";
import dayjs from "dayjs";

/**
 * 요청일과 완료일을 기준으로 responsePeriod를 자동 계산해 저장하는 훅
 * @param {object} form - antd Form 인스턴스
 * @param {number|string} index - 리스트 내 인덱스
 * @param {array} deps - 감시할 watch 값들 (예: [actionDateWatch, requestDateWatch])
 */
function useAutoCalcResponsePeriod(form, index, deps) {
  const prevValueRef = useRef(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const actionDate = form.getFieldValue(`actionCompletionDate-${index}`);
      const requestDate = form.getFieldValue(`requestDatetime`);

      if (actionDate && requestDate) {
        const action = dayjs(actionDate).startOf("day");
        const request = dayjs(requestDate).startOf("day");
        const diff = action.diff(request, "day"); // 요청 → 완료까지 며칠 걸렸는지

        if (diff !== prevValueRef.current) {
          form.setFieldValue(`responsePeriod-${index}`, diff);
          prevValueRef.current = diff;
        }
      } else {
        if (prevValueRef.current !== "") {
          form.setFieldValue(`responsePeriod-${index}`, "");
          prevValueRef.current = "";
        }
      }
    });

    return () => cancelAnimationFrame(frame);
  }, deps);
}

export default useAutoCalcResponsePeriod;
