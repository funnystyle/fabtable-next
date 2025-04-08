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
import {useDownloadCsDetailExcel} from "@components/api/useDownloadCsDetailExcel";

const printItems = [
  // {
  //   label: "프린트",
  //   key: "1",
  // },
  {
    label: "엑셀 양식 다운로드",
    key: "2",
  },
];

const CsCreatePrintButton = () => {
  const {cs} = useCsDataStore();

  const {handleDownload, isPending} = useDownloadCsDetailExcel();

  const onClick = (e) => {
    if (e.key === "1") {
      // 프린트 기능 구현
      // message.info("프린트 기능은 아직 구현되지 않았습니다.");
    } else if (e.key === "2") {
      // 엑셀 양식 다운로드 기능 구현
      if (cs?.id) {
        handleDownload(cs?.id);
      } else {
        (message.error("CS 정보가 잘못되었습니다."));
      }
    }
  }

  return (
    <Dropdown menu={{items: printItems, onClick}}>
      <Button>
        <Space>
          출력
          <DownOutlined/>
        </Space>
      </Button>
    </Dropdown>
  );
};

export default CsCreatePrintButton;
