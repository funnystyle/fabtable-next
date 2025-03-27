// 선택된 코드 정보를 갱신하는 함수
export const handleSelectChangeReturn = (option) => {

  const codeGroupId = option['data-codegroup-id'] ?? option?.props['data-codegroup-id'];
  const codeId = option['data-id'] ?? option?.props['data-id'];  // codeId를 추출
  const childRelations = JSON.parse(option['data-child-relations'] ?? option?.props['data-child-relations']);  // childRelations를 추출

  return { codeGroupId, commonCodeId: codeId, childRelations };

};