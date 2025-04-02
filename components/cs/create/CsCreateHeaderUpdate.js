// pages/order/create/index.js
import React from "react";
import {Button, Dropdown, Flex, message, Space, Tag,} from "antd";
import {useMutation} from "@tanstack/react-query";
import {postAxios, putAxios} from "@api/apiClient";
import {CheckOutlined, CloseOutlined, DownOutlined, EditFilled} from "@ant-design/icons";
import useRecordDataStore from "@store/useRecordDataStore";
import useCsDataStore from "@store/useCsDataStore";
import CsCreateCopyButton from "@components/cs/create/button/CsCreateCopyButton";

const CsCreateHeaderUpdate = ({form}) => {

  const {cs} = useCsDataStore();

  // const { mutate: updateRecord } = useMutation({
  // 	mutationKey: "updateRecord",
  // 	mutationFn: (values) => putAxios("/user/record", values),
  // });
  //
  // const handleSubmit = async (event) => {
  // 	const values = await form.validateFields();
  // 	values.ids = [cs.id];
  //
  // 	await updateRecord(values);
  // 	message.success('수주 수정이 완료되었습니다!');
  // }

  return (
    <div className="top-btn-area">
      {/* 수주 수정시 */}
      <Flex
        align="center"
        justify="space-between"
        className="detail-top-area"
      >
        <Flex align="center">
          {cs.csState}

          <p className="cs-num">
            C/S No. <span className="num">{cs.csNumber}</span>
          </p>
        </Flex>
        <Flex align="center" gap={8} className="detail-btn-area">
          <Flex gap={8} className="btn-space-area">
            <Dropdown
              menu={{items: []}}
            >
              <Button>
                <Space>
                  상태변경
                  <DownOutlined/>
                </Space>
              </Button>
            </Dropdown>

            <Button>C/S이력</Button>
          </Flex>


          <Flex gap={8} className="btn-space-area">
            <Button>신규</Button>
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
