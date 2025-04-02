// pages/order/create/index.js
import React from "react";
import {Button, Dropdown, Flex, Space,} from "antd";
import {CheckOutlined, CloseOutlined, DownOutlined} from "@ant-design/icons";
import useCsDataStore from "@store/useCsDataStore";
import CsCreateCopyButton from "@components/cs/create/button/CsCreateCopyButton";
import CsCreateStatusChangeButton from "@components/cs/create/button/CsCreateStatusChangeButton";
import {useGetCodeList} from "@components/api/useGetCodeList";

const CsCreateHeaderUpdate = ({form}) => {

  const {cs, csState, setAllResetFlag, allResetFlag} = useCsDataStore();

  const handleReset = () => {
    form.resetFields();
    setAllResetFlag(!allResetFlag);
  };

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

            <Button>C/S이력</Button>
          </Flex>


          <Flex gap={8} className="btn-space-area">
            <Button onClick={handleReset}>신규</Button>
            <CsCreateCopyButton />
            <Button>삭제</Button>
          </Flex>

          <Flex gap={8} className="btn-space-area">
            <Button>URL</Button>

            <Dropdown menu={{items: []}}>
              <Button>
                <Space>
                  출력
                  <DownOutlined/>
                </Space>
              </Button>
            </Dropdown>
          </Flex>

          <Flex gap={8}>
            <Button icon={<CloseOutlined/>} iconPosition={"end"}>
              취소
            </Button>
            <Button
              type="primary"
              icon={<CheckOutlined/>}
              iconPosition={"end"}
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
