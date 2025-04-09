// pages/samples/orderInfo/OrderCreateNewFinal.js
import React, { useEffect, useState } from "react";
import { Flex, Form, Layout, Spin, } from "antd";
import InputBoxRow from "@components/inputForm/InputBoxRow";
import CsFollowUplInputBox from "@components/inputForm/cs/CsFollowUplInputBox";
import CsRecordInputBoxes from "@components/cs/create/CsRecordInputBoxes";
import CsAsDetailInputBox from "@components/inputForm/cs/CsAsDetailInputBox";
import CsCreateHeader from "@components/cs/create/CsCreateHeader";
import useCsCreateConstantStore from "@store/useCsCreateConstantStore";
import CsCreateTitle from "@components/cs/create/CsCreateTitle";
import useCsDataStore from "@store/useCsDataStore";
import "dayjs/locale/ko";
import CsCreateAnchor from "@components/cs/create/CsCreateAnchor";
import { loadFormValues } from "@components/inputForm/loadFormValues";
import useRecordSelectCodesStore from "@store/useRecordSelectCodesStore";
import { useGetInputBoxList } from "@components/api/useGetInputBoxList";
import { useGetCsDetail } from "@components/api/useGetCsDetail";
import CsCreateHeaderUpdate from "@components/cs/create/CsCreateHeaderUpdate";
import CsAsInputBox from "@components/inputForm/cs/CsAsInputBox";
import SearchModal from "@components/searchModal/SearchModal";
import useCsCreateLoadCsModalStore from "@store/useCsCreateLoadCsModalStore";
import useCsCreateLoadRecordModalStore from "@store/useCsCreateLoadRecordModalStore";
import useCsCreateHistoryCsModalStore from "@store/useCsCreateHistoryCsModalStore";
import { handleSettingDetail } from "@components/cs/create/func/handleSettingDetail";
import dayjs from "dayjs";

const CsCreate = ({ isActive = true, tabRemove }) => {
  const {data, list, isSuccess} = useGetInputBoxList("csCreate");

  const {data:csRecordData, list:csRecordList, isSuccess:csRecordSuccess} = useGetInputBoxList("csCreateRecord");

  const [form] = Form.useForm();
  const codeRelationSet = new Set();

  const [asKeys, setAsKeys] = useState([0]);
  const [asCheckedKeySet, setAsCheckedKeySet] = useState(new Set());

  const {setAsKeys: setConstantAsKeys, setIsAsDetailCommon, setIsFollowUpCommon, loading, setLoading} = useCsCreateConstantStore();

  useEffect(() => {
    setConstantAsKeys(asKeys);
  }, [asKeys]);

  const {cs, setCsDetail, isCopy, isChange, setIsChange, setCsState} = useCsDataStore();
  const {selectedCodes, setSelectedCodes} = useRecordSelectCodesStore();

  const {data: csDetail, handleReload: csDetailLoad} = useGetCsDetail();

  useEffect(() => {
    if (list && list.length > 0) {
      setLoading(true);

      if (cs?.id) {
        setCsState(cs?.csState);
        setTimeout(() => {
          loadFormValues(cs, data, form, selectedCodes, setSelectedCodes);
          setIsChange(false);
        }, 10);

        csDetailLoad(cs.id)
      } else {
        setLoading(false);
      }
    }
  }, [cs, isSuccess]);

  const {setRecordKeys, setSubRecordKeys} = useCsCreateConstantStore();
  useEffect(() => {
    if (csRecordSuccess) {
      setTimeout(() => {
        handleSettingDetail(form, cs, csDetail, setCsDetail, setRecordKeys, setSubRecordKeys, setAsKeys, setIsAsDetailCommon, setIsFollowUpCommon, setLoading, setIsChange);
      }, 100);
    }
  }, [csDetail, csRecordSuccess]);


  const [anchorContainer, setAnchorContainer] = useState(null);

  useEffect(() => {
    const container = document.querySelector(".anchor-wrapper");
    if (container) {
      setAnchorContainer(container);
    }
  }, [loading]);

  const values = Form.useWatch([], form); // 폼 전체 값을 watch

  useEffect(() => {
    setIsChange(true);
  }, [values]);

  useEffect(() => {
    console.log("csCreate", "isChange", isChange);
  }, [isChange]);

  useEffect(() => {
    setTimeout(() => {
      console.log("csCreate", "isChange to false");
      setIsChange(false);
    }, 300);
  }, [csDetail]);

  return (
    <Layout>
      <div className="contents-flex">
        <CsCreateTitle title="C/S 관리"/>

        {/*<CsCreateTab activeKey={2} />*/}

        {!cs?.id || cs.isCopy || isCopy ? <CsCreateHeader form={form}/>
          : <CsCreateHeaderUpdate form={form} tabRemove={tabRemove}/>}
      </div>

      <Spin spinning={loading} style={{width: "100%", textAlign: "center", paddingTop: 80}}>
        {list && list.length > 0 && (
          <Flex style={{height: 'calc(100vh - 228px)', overflowY: 'auto'}} className="anchor-wrapper">
            <div className="anchor-contents">
              <div
                // style={{ paddingTop: contentHeight }}
                // className="contents-scroll"
              >
                {list.map((item, index) => <InputBoxRow
                  key={`input-box-row-${index}`}
                  form={form}
                  codeRelationSet={codeRelationSet}
                  itemList={item}
                  index={index}
                  type={"cs"}
                    />)}

                <CsRecordInputBoxes form={form} codeRelationSet={codeRelationSet} type="cs" list={csRecordList}/>

                <CsAsInputBox form={form} keys={asKeys} setKeys={setAsKeys} asCheckedKeySet={asCheckedKeySet} setAsCheckedKeySet={setAsCheckedKeySet}/>

                <CsAsDetailInputBox form={form}/>

                <CsFollowUplInputBox form={form}/>
              </div>
            </div>
            {anchorContainer && (
              <CsCreateAnchor list={list} anchorContainer={anchorContainer}/>
            )}
          </Flex>
        )}
      </Spin>

      <SearchModal searchLocation={"cs"} searchType={"OPEN"} isActive={isActive} modalStore={useCsCreateLoadCsModalStore} inBoxType={"csCreateOpenModal"} />

      <SearchModal searchLocation={"order"} searchType={"OPEN"} isActive={isActive} modalStore={useCsCreateLoadRecordModalStore} inBoxType={"recordCreateOpenModal"}/>

      <SearchModal searchLocation={"cs"} searchType={"HISTORY_DETAIL"} isActive={isActive} modalStore={useCsCreateHistoryCsModalStore} inBoxType={"csListHistoryModal"} width={1024} />

    </Layout>
  );
};

export default CsCreate;
