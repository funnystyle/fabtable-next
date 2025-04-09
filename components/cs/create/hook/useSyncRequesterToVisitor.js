import { useEffect, useRef } from "react";
import { Form } from "antd";

/**
 * 요청자 정보를 내방자 정보에 복사하는 훅
 * 체크박스가 체크된 동안 requester 필드 값이 변경되면 visitor 필드에 자동 복사
 *
 * @param {object} form - antd Form 인스턴스
 * @param {boolean} isChecked - 체크 여부
 */
function useSyncRequesterToVisitor(form, isChecked) {
  const prevDataRef = useRef({});

  // ✅ 값 추적
  const requesterCompanyName = Form.useWatch("requesterCompanyName", form);
  const requesterName = Form.useWatch("requesterName", form);
  const requesterContact = Form.useWatch("requesterContact", form);
  const requesterEmail = Form.useWatch("requesterEmail", form);

  useEffect(() => {
    if (!isChecked) return;

    const currentData = {
      visitorCompanyName: requesterCompanyName,
      visitorInCharge: requesterName,
      visitorContact: requesterContact,
      visitorEmail: requesterEmail,
    };

    const isChanged = Object.entries(currentData).some(
      ([key, value]) => prevDataRef.current[key] !== value
    );

    if (isChanged) {
      form.setFieldsValue(currentData);
      prevDataRef.current = currentData;
    }
  }, [
    isChecked,
    requesterCompanyName,
    requesterName,
    requesterContact,
    requesterEmail,
  ]);
}

export default useSyncRequesterToVisitor;
