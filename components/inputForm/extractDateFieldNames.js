export const extractDateFieldNames = (data, type, type2) => {
    const result = [];

    data?.list?.forEach(outerList => {
      outerList.forEach(middleList => {
        middleList.forEach(inputBox => {
          inputBox?.components?.forEach(componentRow => {
            componentRow.forEach(component => {
              const column = component?.recordColumn;
              if (column?.dataType === type || column?.dataType === type2) {
                result.push(column.name);
              }
            });
          });
        });
      });
    });

    return result;
  }