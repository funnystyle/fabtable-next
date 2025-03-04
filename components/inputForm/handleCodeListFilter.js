export const handleCodeListFilter = (selectedCodes, item) => {
  let codeList = [];

  // console.log("item:", item);
  for (let i = 0; i < item.codeList.length; i++) {
    const code = item.codeList[i];

    if (code.parentRelations == null && code.parentRelations.length <= 0) { // 최상위 코드일 경우 바로 입력
      codeList.push(code);
    } else { // 자식코드일 경우 선택된 코드에 따라 필터링
      // selectedCodes에서 현재 코드의 부모 코드의 관계에 속하는 모든 codeGroupId를 필터링
      const filteredSelectedCodeGroupIds = selectedCodes
        .map(selectedCode => selectedCode.codeGroupId)
        .filter(codeGroupId => code.parentRelations.some(relation => relation.id === codeGroupId));

      // 부모 코드들에 대한 선택된 값 리스트
      const parentSelectedCodes = selectedCodes
        .filter(selectedCode => filteredSelectedCodeGroupIds.includes(selectedCode.codeGroupId))
        .map(selectedCode => selectedCode.commonCodeId);

      // 하나라도 부모 코드 관계에 해당하면 추가
      const isChildRelation = parentSelectedCodes.every(parentSelectedCode =>
        code.parentRelations.some(relation =>
          relation.relations.some(rel => rel.parentCodeId === parentSelectedCode)
        )
      );

      if (isChildRelation) {
        codeList.push(code);
      }
    }
  }

  return codeList;
}