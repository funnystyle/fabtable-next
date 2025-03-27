import { convertToDayjs } from "@components/inputForm/convertToDayjs";
import { extractCodeFieldRecordColumns } from "@components/inputForm/extractCodeFieldRecordColumns";
import { handleCodeListFilter } from "@components/inputForm/handleCodeListFilter";
import { extractDateFieldNames } from "@components/inputForm/extractDateFieldNames";
// data, inputBoxResponse?.data, form
export const loadFormValues = ( data, formData, form, selectedCodes, setSelectedCodes) => {
  if (!data?.id) return;

  const dateFields = extractDateFieldNames(formData, "Date");
  const processedRecord = convertToDayjs(data, dateFields);
  form.setFieldsValue(processedRecord);

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