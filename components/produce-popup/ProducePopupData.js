// pages/product_popup.js
import React, { useEffect, useState } from "react";
import { Flex, Typography, Space, Button, Table } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { getAxios } from "@api/apiClient";
const { Title } = Typography;

/* 몰박스 정보 테이블 */
export const molboxData = [
	{
		key: "1",
		title: "몰박스 S/N",
	},
	{
		key: "2",
		title: "몰블럭 S/N",
	},
	{
		key: "3",
		title: "몰블럭 Range",
	},
];

export const molboxInfoData = [
	{
		key: "1",
		division: "5%",
	},
	{
		key: "2",
		division: "10%",
	},
	{
		key: "3",
		division: "20%",
	},
	{
		key: "4",
		division: "30%",
	},
	{
		key: "5",
		division: "40%",
	},
	{
		key: "6",
		division: "50%",
	},
	{
		key: "7",
		division: "60%",
	},
	{
		key: "8",
		division: "70%",
	},
	{
		key: "9",
		division: "80%",
	},
	{
		key: "10",
		division: "90%",
	},
	{
		key: "11",
		division: "100%",
	},
];

export const molboxData2 = [
	{
		key: "1",
	},
	{
		key: "2",
	},
	{
		key: "3",
	},
];

export const molboxInfoData2 = [
	{
		key: "1",
	},
	{
		key: "2",
	},
	{
		key: "3",
	},
	{
		key: "4",
	},
	{
		key: "5",
	},
	{
		key: "6",
	},
	{
		key: "7",
	},
	{
		key: "8",
	},
	{
		key: "9",
	},
	{
		key: "10",
	},
	{
		key: "11",
	},
];

export const molboxData3 = [
	{
		key: "1",
	},
	{
		key: "2",
	},
	{
		key: "3",
	},
];

export const molboxInfoData3 = [
	{
		key: "1",
	},
	{
		key: "2",
	},
	{
		key: "3",
	},
	{
		key: "4",
	},
	{
		key: "5",
	},
	{
		key: "6",
	},
	{
		key: "7",
	},
	{
		key: "8",
	},
	{
		key: "9",
	},
	{
		key: "10",
	},
	{
		key: "11",
	},
];
/* //몰박스 정보 테이블 */

/* 제어계수 테이블 */
export const controlData = [
	{
		key: "1",
		division: "0",
		control: "0",
	},
	{
		key: "2",
		division: "1",
		control: "10",
	},
	{
		key: "3",
		division: "2",
		control: "20",
	},
	{
		key: "4",
		division: "3",
		control: "30",
	},
	{
		key: "5",
		division: "4",
		control: "40",
	},
	{
		key: "6",
		division: "5",
		control: "50",
	},
	{
		key: "7",
		division: "6",
		control: "60",
	},
	{
		key: "8",
		division: "7",
		control: "70",
	},
	{
		key: "9",
		division: "8",
		control: "80",
	},
	{
		key: "10",
		division: "9",
		control: "90",
	},
	{
		key: "11",
		division: "10",
		control: "100",
	},
];

export const controlData2 = [
	{
		key: "1",
		division: "ControlType",
	},
	{
		key: "2",
		division: "Anti Windup",
	},
	{
		key: "3",
		division: "Valve Init vlot",
	},
	{
		key: "4",
		division: "FS Gain",
	},
	{
		key: "5",
		division: "AD Offset",
	},
];

export const controlData3 = [
	{
		key: "1",
		division: "0",
	},
	{
		key: "2",
		division: "1",
	},
	{
		key: "3",
		division: "2",
	},
	{
		key: "4",
		division: "3",
	},
	{
		key: "5",
		division: "4",
	},
	{
		key: "6",
		division: "5",
	},
	{
		key: "7",
		division: "6",
	},
	{
		key: "8",
		division: "7",
	},
	{
		key: "9",
		division: "8",
	},
	{
		key: "10",
		division: "9",
	},
	{
		key: "11",
		division: "10",
	},
];

export const controlData4 = [
	{
		key: "1",
		division: "OUT DA0",
	},
	{
		key: "2",
		division: "OUT DA1",
	},
	{
		key: "3",
		division: "OUT Volt0",
	},
	{
		key: "4",
		division: "OUT Volt1",
	},
	{
		key: "5",
		division: "IN DA0",
	},
	{
		key: "6",
		division: "IN DA1",
	},
	{
		key: "7",
		division: "IN Volt0",
	},
	{
		key: "8",
		division: "IN Volt1",
	},
	{
		key: "9",
		division: "DA",
	},
	{
		key: "10",
		division: "AD",
	},
];

export const controlData5 = [
	{
		key: "1",
		division: "0",
	},
	{
		key: "2",
		division: "10",
	},
	{
		key: "3",
		division: "20",
	},
	{
		key: "4",
		division: "30",
	},
	{
		key: "5",
		division: "40",
	},
	{
		key: "6",
		division: "50",
	},
	{
		key: "7",
		division: "60",
	},
	{
		key: "8",
		division: "70",
	},
	{
		key: "9",
		division: "80",
	},
	{
		key: "10",
		division: "90",
	},
	{
		key: "11",
		division: "100",
	},
];
/* //제어계수 테이블 */

/* 몰박스 정보 테이블 */
export const molboxColumn = [
	{
		title: "title",
		dataIndex: "title",
		key: "title",
		rowScope: "row",
		width: "50%",
	},
	{
		title: "info",
		dataIndex: "info",
		key: "info",
		width: "50%",
	},
];

export const molboxInfoColumn = [
	{
		title: "구분",
		dataIndex: "division",
		key: "division",
		rowScope: "row",
		width: "25%",
	},
	{
		title: "Set Value",
		dataIndex: "value",
		key: "value",
		rowScope: "row",
		width: "25%",
	},
	{
		title: "교정값",
		dataIndex: "correction",
		key: "correction",
		width: "25%",
	},
	{
		title: "에러(%)",
		dataIndex: "error",
		key: "error",
		width: "25%",
	},
];

export const molboxColumn2 = [
	{
		title: "info",
		dataIndex: "info",
		key: "info",
	},
];

export const molboxInfoColumn2 = [
	{
		title: "교정값",
		dataIndex: "correction",
		key: "correction",
		width: "50%",
	},
	{
		title: "에러(%)",
		dataIndex: "error",
		key: "error",
		width: "50%",
	},
];

export const molboxColumn3 = [
	{
		title: "info",
		dataIndex: "info",
		key: "info",
	},
];

export const molboxInfoColumn3 = [
	{
		title: "교정값",
		dataIndex: "correction",
		key: "correction",
		width: "50%",
	},
	{
		title: "에러(%)",
		dataIndex: "error",
		key: "error",
		width: "50%",
	},
];
/* //몰박스 정보 테이블 */

/* 제어계수 테이블 */
export const controlColumn = [
	{
		title: "구분",
		dataIndex: "division",
		key: "division",
		rowScope: "row",
		width: 40,
	},
	{
		title: "제어(%)",
		dataIndex: "control",
		key: "control",
		rowScope: "row",
		width: 60,
	},
	{
		title: "KP",
		dataIndex: "kp",
		key: "kp",
	},
	{
		title: "KI",
		dataIndex: "ki",
		key: "ki",
	},
	{
		title: "KD",
		dataIndex: "kd",
		key: "kd",
	},
];

export const controlColumn2 = [
	{
		title: "구분",
		dataIndex: "division",
		key: "division",
		rowScope: "row",
		width: "50%",
	},
	{
		title: "값",
		dataIndex: "value",
		key: "value",
		width: "50%",
	},
];

export const controlColumn3 = [
	{
		title: "구분",
		dataIndex: "division",
		key: "division",
		rowScope: "row",
	},
	{
		title: "KQ",
		dataIndex: "kq",
		key: "kq",
	},
	{
		title: "KW",
		dataIndex: "kw",
		key: "kw",
	},
	{
		title: "KE",
		dataIndex: "ke",
		key: "ke",
	},
	{
		title: "KR",
		dataIndex: "kr",
		key: "kr",
	},
];

export const controlColumn4 = [
	{
		title: "구분",
		dataIndex: "division",
		key: "division",
		rowScope: "row",
	},
	{
		title: "값",
		dataIndex: "value",
		key: "value",
	},
];

export const controlColumn5 = [
	{
		title: "구분(%)",
		dataIndex: "division",
		key: "division",
		rowScope: "row",
	},
	{
		title: "값",
		dataIndex: "value",
		key: "value",
	},
];
/* //제어계수 테이블 */
