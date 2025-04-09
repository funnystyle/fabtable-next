import { useEffect, useRef } from "react";

/**
 * mgmrBin 자동 계산 후 form에 설정해주는 커스텀 훅
 * @param {object} form - antd Form instance
 * @param {array} mgmrBinList - mgmrBin 데이터 목록
 * @param {object} deps - 감시할 form 값들 (watch 값)
 */
function useAutoSelectMgmrBin(form, mgmrBinList, deps) {
  const prevValueRef = useRef({ valueNo: null, gasMax: null });

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const productCategory = form.getFieldValue("productCategory") || "";
      const productModel = form.getFieldValue("productModel") || "";
      const fluid = form.getFieldValue("fluid") || "";
      const flowrate = form.getFieldValue("flowrate") || 0;

      const mgmrBin = mgmrBinList.find(
        (item) =>
          item.modelName.includes(productCategory + productModel) &&
          item.gasName === fluid &&
          item.gasMin <= flowrate &&
          item.gasMax >= flowrate
      );

      if (mgmrBin) {
        const { valueNo, gasMax } = mgmrBin;
        if (
          prevValueRef.current.valueNo !== valueNo ||
          prevValueRef.current.gasMax !== gasMax
        ) {
          form.setFieldsValue({
            mgmrBin: valueNo,
            maxFlowMgmr: gasMax,
          });
          prevValueRef.current = { valueNo, gasMax };
        }
      } else {
        if (prevValueRef.current.valueNo !== "None") {
          form.setFieldValue("mgmrBin", "None");
          prevValueRef.current = { valueNo: "None", gasMax: null };
        }
      }
    });

    return () => cancelAnimationFrame(frame);
  }, deps); // deps는 반드시 배열로 전달
}

export default useAutoSelectMgmrBin;
