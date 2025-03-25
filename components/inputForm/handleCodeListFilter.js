export const handleCodeListFilter = (selectedCodes, recordColumn) => {

  if (recordColumn == null || recordColumn.codeList == null || recordColumn.codeList.length <= 0) {
    return [];
  }

  let resultCodeList = []

    // console.log("item:", item);
  for (let i = 0; i < recordColumn.codeList.length; i++) {
    const code = recordColumn.codeList[i];

    if (code.parentRelations == null && code.parentRelations.length <= 0) { // 최상위 코드일 경우 바로 입력
      resultCodeList.push(code);
    } else { // 자식코드일 경우 선택된 코드에 따라 필터링
            // if (recordColumn.name === "productChannel") {
            //   console.log("handleCodeListFilter selectedCodes:", selectedCodes);
            // }

            // if (recordColumn.name === "productChannel") {
            //   console.log("handleCodeListFilter code:", code);
            // }
      // selectedCodes에서 현재 코드의 부모 코드의 관계에 속하는 모든 codeGroupId를 필터링
      const filteredSelectedCodeGroupIds = selectedCodes
        .map(selectedCode => selectedCode.codeGroupId)
        .filter(codeGroupId => code.parentRelations.some(relation => relation.id === codeGroupId));

            // if (recordColumn.name === "productChannel") {
            //   console.log("handleCodeListFilter filteredSelectedCodeGroupIds:", filteredSelectedCodeGroupIds);
            // }

      // 부모 코드들에 대한 선택된 값 리스트
      const parentSelectedCodes = selectedCodes
        .filter(selectedCode => filteredSelectedCodeGroupIds.includes(selectedCode.codeGroupId))
        .map(selectedCode => selectedCode.commonCodeId);

            // if (recordColumn.name === "productChannel") {
            //   console.log("handleCodeListFilter parentSelectedCodes:", parentSelectedCodes);
            // }

      // 하나라도 부모 코드 관계에 해당하면 추가
      const isChildRelation = parentSelectedCodes.every(parentSelectedCode =>
        code.parentRelations.some(relation =>
          relation.relations.some(rel => rel.parentCodeId === parentSelectedCode)
        )
      );

            // if (recordColumn.name === "productChannel") {
            //   console.log("handleCodeListFilter isChildRelation:", isChildRelation);
            // }

      if (isChildRelation) {
        resultCodeList.push(code);
      }
    }
  }

  // if (recordColumn.name === "productChannel") {
  //   console.log("handleCodeListFilter resultCodeList:", resultCodeList);
  // }

  return resultCodeList;
}