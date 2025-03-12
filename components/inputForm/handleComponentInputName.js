export const handleComponentInputName = (recordColumn, index) => {
  return `${recordColumn.name}${index >= 0 ? `-${index}` : ""}`;
}