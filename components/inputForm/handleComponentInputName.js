export const handleComponentInputName = (recordColumn, index = -1) => {
  return `${recordColumn.name}${index >= 0 ? `-${index}` : ""}`;
}