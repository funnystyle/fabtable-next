// pages/order/create/index.js
import React from "react";
import {Button, Dropdown, Flex, message, Space, Tag,} from "antd";
import {useMutation} from "@tanstack/react-query";
import {postAxios, putAxios} from "@api/apiClient";
import {CheckOutlined, CloseOutlined, DownOutlined, EditFilled} from "@ant-design/icons";
import useRecordDataStore from "@store/useRecordDataStore";
import useCsDataStore from "@store/useCsDataStore";

const CsCreateCopyButton = ({form}) => {

  const {setIsCopy} = useCsDataStore();

  const onClick = () => {
    setIsCopy(true);
  }
  return (
    <Button onClick={onClick}>복제</Button>
  );
};

export default CsCreateCopyButton;
