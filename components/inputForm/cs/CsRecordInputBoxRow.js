import { Button, Flex, InputNumber, Typography } from "antd";
import { DeleteOutlined, PlusOutlined, RedoOutlined, SettingOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import useCsCreateConstantStore from "@store/useCsCreateConstantStore";
import CsRecordInputBox from "@components/inputForm/cs/CsRecordInputBox";
import CsRecordInputBoxInitial from "@components/inputForm/cs/CsRecordInputBoxInitial";
import useRecordDataStore from "@store/useRecordDataStore";
import useModalStore from "@store/useModalStore";

const { Title } = Typography;

const CsRecordInputBoxRow = ({ form, codeRelationSet, itemList, copyCountRef, index }) => {

  const { recordKeys, setRecordKeys, checkedKeySet } = useCsCreateConstantStore();
  const { record } = useRecordDataStore();
  const { index:recordIndex, openDiv } = useModalStore();


  const handleCopy = () => {
    const copyCount = copyCountRef.current.value || 1;

    const newRecordKeys = [];
    for (let i = 0; i < copyCount; i++) {
      const copyRecordKeys = Array.from(checkedKeySet).map((key) => recordKeys[key]);

      copyRecordKeys.forEach((recordKey) => {
        newRecordKeys.push(recordKey);
      });
    }

    setRecordKeys([...recordKeys, ...newRecordKeys]);
  };

  const handleDelete = () => {
    const newRecordKeys = recordKeys.filter((_, idx) => !checkedKeySet.has(idx));
    setRecordKeys(newRecordKeys);
  }

  useEffect(() => {
    if (record?.id) {
      console.log("record", record);
      setRecordKeys([...recordKeys, record.id]);
      if (openDiv === "defect") {
        const recordObject = Object.keys(record).reduce((acc, key) => {
          let newKey;
          if (key === "oldSerialNumber") {
            newKey = `defectMfcSN-${recordIndex}`;
          }else {
            newKey = `${key}-${recordIndex}`;
          }
          acc[newKey] = record[key];
          return acc;
        }, {});
        form.setFieldsValue(recordObject);
      } else if (openDiv === "substitute") {
        const recordObject = Object.keys(record).reduce((acc, key) => {
          let newKey;
          if (key === "oldSerialNumber") {
            newKey = `substituteMfcSN-${recordIndex}`;
          } else if (key === "nowState") {
            newKey = `substituteNowState-${recordIndex}`;
          }
          acc[newKey] = record[key];
          return acc;
        }, {});
        form.setFieldsValue(recordObject);
      }
    }
  }, [record]);

  // 복사 버튼 클릭 시
  return (
    <div key={`cs-record-input-box-${index}`}>
      <div id={itemList[0][0].name}>
        <Flex
          align="center"
          justify="space-between"
          className="info-title-area"
        >
          <Flex align="center" gap={8}>
            <Title level={3} className="title-bullet">
              {itemList[0][0].displayName}
            </Title>

            <Flex align="center" gap={4} className="tit-side-area">
              <InputNumber
                min={1}
                max={10}
                defaultValue={3}
                ref={copyCountRef}
                // onChange={onChange}
              />

              <Button
                type="primary"
                icon={<PlusOutlined />}
                iconPosition={"end"}
                onClick={() => handleCopy()}
              >
                제품 추가
              </Button>

              <Button icon={<DeleteOutlined />}
                      iconPosition={"end"}
                onClick={() => handleDelete()}
              >
                삭제
              </Button>

              <p className="total-num">
                총 <strong>2</strong> 개
              </p>
            </Flex>
          </Flex>

          <Flex gap={10}>
            <Button
              icon={<RedoOutlined />}
              size="small"
              className="ico-rotate"
            />

            <Button icon={<SettingOutlined />} size="small" />
          </Flex>
        </Flex>

        {/*비어있을때는 빈 폼을 보여준다.*/}
        {recordKeys.length === 0 &&
          <Flex gap={20} className="info-input-col2" >
            {itemList.map((item, i) =>
              <CsRecordInputBoxInitial
                key={`cs-record-input-box-${index}-${i}`}
                item={item}
              />
            )}
          </Flex>
        }

        {/*비어있지않을때는 리스트를 보여준다.*/}
        {recordKeys.map((key, index) => (
          <React.Fragment key={`record-fragment-${key}-${index}`}>
            {index > 0 && (<div style={{marginTop: '1.75rem'}} />)}
            <Flex gap={20} className="info-input-col2" key={`record-${key}`}>
              {itemList.map((item, i) =>
                <CsRecordInputBox
                  key={`cs-record-input-box-${index}-${i}`}
                  form={form} 
                  codeRelationSet={codeRelationSet} 
                  item={item}
                  index={index + 1}
                />
                )}
            </Flex>
          </React.Fragment>
        ))}
      </div>
      <div className="info-wrap" />
    </div>
  );
}

export default CsRecordInputBoxRow;