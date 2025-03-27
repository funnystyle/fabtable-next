import { Button, Flex, InputNumber, Typography } from "antd";
import { DeleteOutlined, PlusOutlined, RedoOutlined, SettingOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import useCsCreateConstantStore from "@store/useCsCreateConstantStore";
import CsRecordInputBox from "@components/inputForm/cs/CsRecordInputBox";
import CsRecordInputBoxInitial from "@components/inputForm/cs/CsRecordInputBoxInitial";
import useRecordDataStore from "@store/useRecordDataStore";
import useModalStore from "@store/useModalStore";
import dayjs from "dayjs";

export const csRecordInputs = ["defectMfcSN"
  , "substituteMfcSN"
  , "productModel"
  , "subModelName"
  , "fluid"
  , "flowrate"
  , "customerCode"
  , "productionDepartment"
  , "defectClassification"
  , "phenomenonClassification"
  , "nowState"
  , "substituteNowState"
  , "actionClassification"
  , "severity"
  , "defectMfcWithdrawalDate"
  , "actionCompletionDate"
  , "productCertificationDate"
  , "deliverDatetime"
  , "certificationDateUsageDays"
  , "deliveryDateUsageDays"]
