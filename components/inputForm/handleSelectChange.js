// 선택된 코드 정보를 갱신하는 함수
export const handleSelectChange = (form, codeRelationSet, selectedCodes, setSelectedCodes, option) => {

  if (option === undefined || option === null) {
    return;
  }

  const codeGroupId = option['data-codegroup-id'] ?? option?.props['data-codegroup-id'];
  const codeId = option['data-id'] ?? option?.props['data-id'];  // codeId를 추출
  const childRelations = JSON.parse(option['data-child-relations'] ?? option?.props['data-child-relations']);  // childRelations를 추출

  let newSelectedCodes = [...selectedCodes];

  // 상위 코드가 변경될 경우, 기존에 선택된 해당 그룹의 하위 코드 삭제
  newSelectedCodes = newSelectedCodes.filter(
    (item) => !childRelations.some(child => child.id === item.codeGroupId) // 하위 코드와 연결된 기존 선택 항목 제거
  );

  // 기존에 선택된 코드가 있으면 업데이트, 없으면 추가
  const index = newSelectedCodes.findIndex((item) => item.codeGroupId === codeGroupId);
  if (index !== -1) {
    newSelectedCodes[index] = { codeGroupId, commonCodeId: codeId, childRelations };
  } else {
    newSelectedCodes.push({ codeGroupId, commonCodeId: codeId, childRelations });
  }

  setSelectedCodes(newSelectedCodes);

  const formValues = form.getFieldsValue(); // 현재 폼의 모든 필드 값 가져오기
  Object.keys(formValues).filter((name) => {
    codeRelationSet.forEach((item) => {
      childRelations.forEach((relation) => {
        if (relation.id === item.codeGroupId && item.name === name) {
          form.resetFields([name]);
        }
      });
    });
  });

};