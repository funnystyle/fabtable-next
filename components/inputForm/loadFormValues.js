import { convertToDayjs } from "@components/inputForm/convertToDayjs";
import { extractCodeFieldRecordColumns } from "@components/inputForm/extractCodeFieldRecordColumns";
import { handleCodeListFilter } from "@components/inputForm/handleCodeListFilter";
import { extractDateFieldNames } from "@components/inputForm/extractDateFieldNames";
// data, inputBoxResponse?.data, form
export const loadFormValues = ( data, formData, form, selectedCodes, setSelectedCodes) => {
  if (!data?.id) return;

  //// 필드에 값 등록
  // date, datetime 필드만 추출
  const dateFields = extractDateFieldNames(formData, "Date", "Datetime");
  // 추출한 필드를 dayjs로 변환, 나머지는 현상 유지
  const processedRecord = convertToDayjs(data, dateFields);
  form.setFieldsValue(processedRecord);

  // 선택된 코드 정보 저장
  const newSelectedCodes = [];
  const recordColumns = extractCodeFieldRecordColumns(formData);
  recordColumns.forEach((recordColumn, i) => {
    const codeList = handleCodeListFilter(selectedCodes, recordColumn);
    if (codeList.length > 0) {
      const selectedOption = (() => {
        const code = codeList.find(code => code.codeName === data[recordColumn.name]);
        return code ? {
          value: code.codeName,
          codeGroupId: recordColumn.codeGroupId,
          commonCodeId: code.id,
          childRelations: code.childRelations
        } : null;
      })();
      if (selectedOption) {
        newSelectedCodes.push(selectedOption);
      }
    }
  });

  setSelectedCodes(newSelectedCodes);
}