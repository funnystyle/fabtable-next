export const extractDateFieldNames = (data, type) => {
    const result = [];

    data?.list?.forEach(outerList => {
      outerList.forEach(middleList => {
        middleList.forEach(inputBox => {
          inputBox?.components?.forEach(componentRow => {
            componentRow.forEach(component => {
              const column = component?.recordColumn;
              if (column?.dataType === type) {
                result.push(column.name);
              }
            });
          });
        });
      });
    });

    return result;
  }