import { Button, Flex, InputNumber, Typography } from "antd";
import { DeleteOutlined, PlusOutlined, RedoOutlined, SettingOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import useCsCreateConstantStore from "@store/useCsCreateConstantStore";
import CsRecordInputBox from "@components/inputForm/cs/CsRecordInputBox";
import CsRecordInputBoxInitial from "@components/inputForm/cs/CsRecordInputBoxInitial";
import useRecordDataStore from "@store/useRecordDataStore";
import "dayjs/locale/ko";
import dayjs from "dayjs";
import { csRecordInputs } from "@components/inputForm/cs/data/csRecordInputs";
import useCsDataStore from "@store/useCsDataStore";
import useCsCreateLoadRecordModalStore from "@store/useCsCreateLoadRecordModalStore";

const { Title } = Typography;

const CsRecordInputBoxRow = ({ form, codeRelationSet, itemList, copyCountRef, index, type }) => {

  const { recordKeys, setRecordKeys, subRecordKeys, setSubRecordKeys, checkedKeySet, setCheckedKeySet } = useCsCreateConstantStore();
  const { record } = useRecordDataStore();
  const { index:recordIndex, openDiv } = useCsCreateLoadRecordModalStore();

  const handleReset = () => {
    setRecordKeys([null]);
    setSubRecordKeys([null]);
    setCheckedKeySet(new Set());
  }

  const { allResetFlag } = useCsDataStore();
  useEffect(() => {
    handleReset();
  }, [allResetFlag]);

  const handleAdd = () => {
    const copyCount = copyCountRef.current.value || 1;
    let newRecordKeys = [...recordKeys];
    let newSubRecordKeys = [...subRecordKeys];
    for (let i = 0; i < copyCount; i++) {
      newRecordKeys.push(null);
      newSubRecordKeys.push(null);
    }
    setRecordKeys(newRecordKeys);
    setSubRecordKeys(newSubRecordKeys);
  }

  const handleCopy = () => {
    const copyCount = copyCountRef.current.value || 1;

    const recordKeysLength = recordKeys.length;

    // 추가할 레코드 키 정의
    const newRecordKeys = [];
    const newSubRecordKeys = [];

    // 체크된 키 리스트
    const checkedKeys = Array.from(checkedKeySet);

    // 체크된 index를 바탕으로 기존 레코드 키와 서브 레코드 키를 가져옴(복사되는 키들)
    const copyRecordKeys = Array.from(checkedKeySet).map((key) => recordKeys[key-1]);
    const copySubRecordKeys = Array.from(checkedKeySet).map((key) => subRecordKeys[key-1]);

    // copyCount 만큼 반복하여 새로운 레코드 키와 서브 레코드 키를 생성
    for (let i = 0; i < copyCount; i++) {
      copyRecordKeys.forEach((recordKey) => {
        newRecordKeys.push(recordKey);
      });

      copySubRecordKeys.forEach((subRecordKey) => {
        newSubRecordKeys.push(subRecordKey);
      });
    }

    // 기존 레코드 키와 서브 레코드 키를 업데이트
    setRecordKeys([...recordKeys, ...newRecordKeys]);
    setSubRecordKeys([...subRecordKeys, ...newSubRecordKeys]);

    // 복사된 레코드 키에 대해 폼 필드 값을 설정
    setTimeout(() => {
      let count = 0;
      for (let i = 0; i < copyCount; i++) {
        checkedKeys.forEach((key) => {
          const prev = key;
          const next = count + recordKeysLength + 1;

          csRecordInputs.forEach((field) => {
            const prevValue = form.getFieldValue(`${field}-${prev}`);

            // Select 값이 객체일 경우 처리
            form.setFieldValue(`${field}-${next}`, prevValue);
          });

          count++;
        });
      }

      setCheckedKeySet(new Set());
    }, 100);
  };

  const handleDelete = () => {

    const keptValues = {}; // 삭제되지 않은 값들을 모아둘 객체

    // 1. 삭제 대상이 아닌 값들만 추출
    recordKeys.forEach((_, idx) => {
      if (!checkedKeySet.has(idx + 1)) {
        csRecordInputs.forEach((field) => {
          const key = `${field}-${idx + 1}`;
          keptValues[field] = keptValues[field] || [];
          keptValues[field].push(form.getFieldValue(key));
        });
      }
    });

    // 2. form 값들을 위에서부터 다시 세팅
    csRecordInputs.forEach((field) => {
      keptValues[field].forEach((val, idx) => {
        form.setFieldValue(`${field}-${idx + 1}`, val);
      });
    });


    const newRecordKeys = recordKeys.filter((_, idx) => !checkedKeySet.has(idx + 1));
    setRecordKeys(newRecordKeys);
    const newSubRecordKeys = subRecordKeys.filter((_, idx) => !checkedKeySet.has(idx + 1));
    setSubRecordKeys(newSubRecordKeys);

    setCheckedKeySet(new Set());
  }

  useEffect(() => {
    if (record?.id) {
      if (openDiv === "defect") {
        if (recordKeys.length === 0) {
          setRecordKeys([record.id]);
        } else {
          recordKeys[recordIndex - 1] = record.id;
          setRecordKeys([...recordKeys]);
        }


        const recordObject = Object.keys(record).reduce((acc, key) => {
          let newKey;
          if (key === "serialNumber") {
            newKey = `defectMfcSN-${recordIndex}`;
          } else if (key === "nowState") {
          } else if (key === "nowStateText") {
            newKey = `nowState-${recordIndex}`;
          } else {
            newKey = `${key}-${recordIndex}`;
          }
          acc[newKey] = record[key];
          return acc;
        }, {});
        form.setFieldsValue(recordObject);

        const today = dayjs().startOf('day');
        const deliverDate = dayjs(record.deliverDatetime).startOf('day');
        const diffInDays = today.diff(deliverDate, 'day');
        form.setFieldValue(`deliveryDateUsageDays-${recordIndex}`, diffInDays );
      } else if (openDiv === "substitute") {
        subRecordKeys[recordIndex - 1] = record.id;

        const recordObject = Object.keys(record).reduce((acc, key) => {
          let newKey;
          if (key === "serialNumber") {
            newKey = `substituteMfcSN-${recordIndex}`;
          } else if (key === "nowStateText") {
            newKey = `substituteNowState-${recordIndex}`;
          }
          acc[newKey] = record[key];
          return acc;
        }, {});
        form.setFieldsValue(recordObject);
      }
    }
  }, [record]);

  return (
    <div key={`cs-record-input-box-${index}`}>
      <div id={`${type}-anchor-${itemList[0][0].name}`}>
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
                defaultValue={1}
                ref={copyCountRef}
                // onChange={onChange}
              />

              <Button
                type="primary"
                icon={<PlusOutlined />}
                iconPosition={"end"}
                onClick={() => handleAdd()}
              >
                제품 추가
              </Button>

              {checkedKeySet.size > 0 &&
                <>
                  <Button
                    type="primary"
                    icon={<PlusOutlined/>}
                    iconPosition={"end"}
                    onClick={() => handleCopy()}
                  >
                    제품 복사
                  </Button>

                  <Button icon={<DeleteOutlined/>}
                          iconPosition={"end"}
                          onClick={() => handleDelete()}
                  >
                    삭제
                  </Button>

                  <p className="total-num">
                    총 <strong>{checkedKeySet.size}</strong> 개
                  </p>
                </>
              }
            </Flex>
          </Flex>

          <Flex gap={10}>
            <Button
              icon={<RedoOutlined />}
              size="small"
              className="ico-rotate"
              onClick={() => handleReset()}
            />

            {/*<Button icon={<SettingOutlined />} size="small" />*/}
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
          key === null ?
            <React.Fragment key={`record-fragment-${key}-${index}`}>
              {index > 0 && (<div className="info-wrap-product-gap" />)}
              <Flex gap={20} className="info-input-col2" >
                {itemList.map((item, i) =>
                  <CsRecordInputBoxInitial
                    key={`cs-record-input-box-${index}-${i}`}
                    form={form}
                    item={item}
                    index={index + 1}
                  />
                )}
              </Flex>
            </React.Fragment>
            :
          <React.Fragment key={`record-fragment-${key}-${index}`}>
            {index > 0 && (<div className="info-wrap-product-gap" />)}
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