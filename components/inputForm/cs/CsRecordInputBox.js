import { Button, Checkbox, Flex, Form, Typography } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import React from "react";
import CsRecordInputComponentRow from "@components/inputForm/cs/CsRecordInputComponentRow";
import { handleComponentInputName } from "@components/inputForm/handleComponentInputName";
import useCsCreateConstantStore from "@store/useCsCreateConstantStore";
import "dayjs/locale/ko";
import { csRecordInputs } from "@components/inputForm/cs/data/csRecordInputs";
import useCsCreateLoadRecordModalStore from "@store/useCsCreateLoadRecordModalStore";
import { handleRecordInfoPopup } from "@components/popup/handleOpenPopup";
import useAutoCalcCertificationUsageDays from "@components/cs/create/hook/useAutoCalcCertificationUsageDays";

const { Title } = Typography;

const CsRecordInputBox = ({ form, codeRelationSet, item, index }) => {

  const { recordKeys, setRecordKeys, subRecordKeys, setSubRecordKeys, checkedKeySet, setCheckedKeySet } = useCsCreateConstantStore();
  const { setOpenSearchModal, setIndex, setOpenDiv } = useCsCreateLoadRecordModalStore();

  // 삭제
  const handleDeleteCsRecord = (index) => {
    // 하나씩 땡김
    csRecordInputs.forEach((field) => {
      for (let i = index + 1; i <= recordKeys.length; i++) {
        form.setFieldValue(`${field}-${i - 1}`, form.getFieldValue(`${field}-${i}`));
      }
    });

    const newRecordKeys = recordKeys.filter((_, idx) => idx + 1 !== index);
    setRecordKeys(newRecordKeys);
    const newSubRecordKeys = subRecordKeys.filter((_, idx) => idx + 1 !== index);
    setSubRecordKeys(newSubRecordKeys);
  }

  // 체크 박스 체크
  const handleCheckboxChange = (e, currentIndex) => {
    const newSet = new Set(checkedKeySet); // 기존 Set을 복사하여 새로운 Set 생성
    if (e.target.checked) {
      newSet.add(currentIndex);
    } else {
      newSet.delete(currentIndex);
    }
    setCheckedKeySet(newSet);
  };

  // 폼 변경시 이벤트(날짜 설정)
  const productCertificationDateWatch = Form.useWatch(`productCertificationDate-${index}`, form); // 폼 전체 값을 watch
  useAutoCalcCertificationUsageDays(form, index, [productCertificationDateWatch]);

  // item.subDisplayName이 있을 경우 타이틀 표시
  if (item.length === 1) {
    const componentsList = item[0].components;

    const handleReset = () => {
      const nameList = [];

      // `componentsList.map()`을 사용하여 name 수집
      componentsList.forEach((components) => {
        // name 생성
        components.forEach((component) => {
          const name = handleComponentInputName(component.recordColumn, index);
          nameList.push(name);
        });
      });

      form.resetFields(nameList);
    }

    return (
      <div className="info-input-box">
        {item[0].subDisplayName && (
          <Flex align="center" justify="space-between">
            <Flex align="center" gap={12} className="title-area">
              <Title level={5} style={{ marginBottom: "0", }}>{`제품 ${index}`}</Title>

              <Checkbox checked={checkedKeySet.has(index)} onChange={(e) => handleCheckboxChange(e, index)} />

              <Flex gap={4} className="tit-side-area">
                <Button type="primary" size="small" onClick={() => {
                  setIndex(index);
                  setOpenDiv("defect");
                  setOpenSearchModal(true);
                }}>불량제품 불러오기</Button>
                <Button type="primary" size="small" onClick={() => {
                  setIndex(index);
                  setOpenDiv("substitute");
                  setOpenSearchModal(true);
                }}>대체제품 불러오기</Button>

                <Button color="primary" variant="outlined" size="small" onClick={(e) => handleRecordInfoPopup(window, [{id:recordKeys[index - 1]}])}>수주 종합정보</Button>

                <Button icon={<DeleteOutlined />} size="small"
                  onClick={() => handleDeleteCsRecord(index)}
                />
              </Flex>
            </Flex>

            <Button type="text" className="btn-all-reset" onClick={() => handleReset()}>초기화</Button>
          </Flex>
        )}

        <Form form={form} layout="vertical" className="info-input-area">
          {componentsList.map((components, i) => <CsRecordInputComponentRow key={`cs-record-input-component-${i}`} form={form} codeRelationSet={codeRelationSet} components={components} index={index} />)}
        </Form>
      </div>
    );
  } else {
    const InputBox = (box, index) => {
      const componentsList = box.components;

      return (
        <>
          {index !== 0 && <div className="info-box-row-wrap"/> }
          <div className="info-input-box">
            {box.subDisplayName && (
              <Flex justify="space-between">
                <Title level={5}>{box.subDisplayName}</Title>

                <Button type="text" className="btn-all-reset" onClick={() => handleReset()}>
                  초기화
                </Button>
              </Flex>
            )}

            <Form form={form} layout="vertical" className="info-input-area">
              {componentsList.map((components, i) => <CsRecordInputComponentRow key={`cs-record-input-component-${i}`} form={form} codeRelationSet={codeRelationSet} components={components} index={index} />)}
            </Form>
          </div>
        </>
      );
    }

    return (
      <div className="row-2">
        {item.map((box, index) => InputBox(box, index))}
      </div>
    );
  }
}

export default CsRecordInputBox;