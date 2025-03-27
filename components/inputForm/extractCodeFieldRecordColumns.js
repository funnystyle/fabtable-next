export const extractCodeFieldRecordColumns = (data) => {
  const result = [];

  data?.list?.forEach(outerList => {
    outerList.forEach(middleList => {
      middleList.forEach(inputBox => {
        inputBox?.components?.forEach(componentRow => {
          componentRow.forEach(component => {
            const column = component?.recordColumn;
            if (column?.connectionDiv === "CODE") {
              result.push(column);
            }
          });
        });
      });
    });
  });

  return result;
}