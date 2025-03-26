import {Button, Flex, Form, Input, Radio, Typography} from "antd";
import {DeleteOutlined, PlusOutlined, RedoOutlined, SettingOutlined} from "@ant-design/icons";
import React, {useEffect} from "react";
import useCsCreateConstantStore from "@store/useCsCreateConstantStore";

const { Title } = Typography;

export const CsAsDetailTitle = ({ title, isCommon, setIsCommon }) => {

  const { recordKeys:keys } = useCsCreateConstantStore();


  return (
    <Flex
      align="center"
      justify="space-between"
      className="info-title-area"
    >
      <Flex align="center" gap={8}>
        <Title level={3} className="title-bullet">{title}</Title>

        <Flex align="center" gap={4} className="tit-side-area">
          <Radio.Group value={isCommon} onChange={(e) => setIsCommon(e.target.value)}>
            <Radio value={true}>공통</Radio>
            {keys.length > 0 && <Radio value={false}>제품별</Radio>}
          </Radio.Group>
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
  );
}