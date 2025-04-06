// pages/order/create/index.js
import React from "react";
import { Button, Dropdown, Flex, message, Space, } from "antd";
import { CheckOutlined, CloseOutlined, DownOutlined } from "@ant-design/icons";
import useCsDataStore from "@store/useCsDataStore";
import CsCreateCopyButton from "@components/cs/create/button/CsCreateCopyButton";
import CsCreateStatusChangeButton from "@components/cs/create/button/CsCreateStatusChangeButton";
import CsCreateDeleteButton from "@components/cs/create/button/CsCreateDeleteButton";
import { transformTagDataSingle } from "@components/order/table/transformTagData";
import useCsCreateConstantStore from "@store/useCsCreateConstantStore";
import { useMutation } from "@tanstack/react-query";
import { putAxios } from "@api/apiClient";
import { handleCopyUrl } from "@components/event/handleCopyUrl";
import CsHistoryButton from "@components/cs/list/button/CsHistoryButton";
import useCsCreateHistoryCsModalStore from "@store/useCsCreateHistoryCsModalStore";
import CsCreatePrintButton from "@components/cs/create/button/CsCreatePrintButton";

const CsCreateHeaderUpdate = ({form}) => {

  const {cs, csState, setAllResetFlag, allResetFlag, tagInfoList, setCsState, setCs} = useCsDataStore();

  const handleReset = () => {
    form.resetFields();
    setAllResetFlag(!allResetFlag);
    setCsState(transformTagDataSingle(tagInfoList, "신규"));
    setCs({});
  };

  const { mutate: csUpdate } = useMutation({
    mutationKey: "csUpdate",
    mutationFn: (values) => putAxios(`/user/cs/${cs.id}`, values, true),
    onSuccess: (response, values) => {
      values.id= cs.id;
      values.csNumber = cs.csNumber;
      values.csState = csState;

      setCs(values)
    }
  });

  const { isAsDetailCommon, isFollowUpCommon, files, asKeys } = useCsCreateConstantStore();

  const convertBlobUrlToFile = async (blobUrl, fileName, mimeType) => {
    const res = await fetch(blobUrl);
    const blob = await res.blob(); // Blob 객체로 변환
    return new File([blob], fileName, { type: mimeType }); // File 객체로 반환
  };

  const handleSubmit = async (event) => {
    const values = await form.validateFields();
    values["isAsDetailCommon"] = isAsDetailCommon;
    values["isFollowUpCommon"] = isFollowUpCommon;
    values["asWorkLength"] = asKeys.length;

    const formData = new FormData();
    formData.append("data", new Blob([JSON.stringify(values)], { type: "application/json" }));

    if (files) {
      let fileLength = {};
      for (const [index, fileArray] of Object.entries(files)) {
        for (const file of fileArray) {
          const fileName = file.name;
          const mimeType = file.type;

          // Blob URL을 실제 File 객체로 변환
          const actualFile = await convertBlobUrlToFile(file.url, fileName, mimeType);

          console.log("actualFile: ", actualFile);
          formData.append("files", actualFile);
        }
        // index별로 files.length를 fileMeta로 formData에 추가
        fileLength[index] = fileArray.length;
      }
      formData.append(`fileMeta`, new Blob([JSON.stringify({fileLength:fileLength})], { type: "application/json" }));
    }

    await csUpdate(formData);
    message.success('CS 등록이 완료되었습니다!');
    // moveUrl("/cs/list")
  }

  return (
    <div className="top-btn-area">
      {/* 수주 수정시 */}
      <Flex
        align="center"
        justify="space-between"
        className="detail-top-area"
      >
        <Flex align="center">
          {csState}

          <p className="cs-num">
            C/S No. <span className="num">{cs.csNumber}</span>
          </p>
        </Flex>
        <Flex align="center" gap={8} className="detail-btn-area">
          <Flex gap={8} className="btn-space-area">
            <CsCreateStatusChangeButton />

            <CsHistoryButton openLength={1} modalStore={useCsCreateHistoryCsModalStore} />
          </Flex>


          <Flex gap={8} className="btn-space-area">
            <CsCreateCopyButton />
            <Button onClick={handleReset}>신규</Button>
            <CsCreateDeleteButton handleReset={handleReset}/>
          </Flex>

          <Flex gap={8} className="btn-space-area">
            <Button onClick={handleCopyUrl}>URL</Button>

            <CsCreatePrintButton />
          </Flex>

          <Flex gap={8}>
            <Button icon={<CloseOutlined/>} iconPosition={"end"}>
              취소
            </Button>
            <Button
              type="primary"
              icon={<CheckOutlined/>}
              iconPosition={"end"}
              onClick={handleSubmit}
            >
              저장
            </Button>
          </Flex>
        </Flex>
      </Flex>
      {/* //수주 수정시 */}
    </div>
  );
};

export default CsCreateHeaderUpdate;
