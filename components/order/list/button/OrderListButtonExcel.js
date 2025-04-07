// pages/order/create/index.js
import React from "react";
import {Button, Dropdown, message, Space,} from "antd";
import {DownOutlined} from "@ant-design/icons";
import {useDownloadOrderListExcel} from "@components/api/useDownloadOrderListExcel";

const handleMenuClick = (e) => {
	message.info("Click on menu item.");
	console.log("click", e);
};

const excelItems = [
	{
		label: "편집 항목만",
		key: "1",
		children: [
			{
				key: "1-1",
				label: "선택한 행",
			},
			{
				key: "1-2",
				label: "전체 행",
			},
		],
	},
	{
		label: "전체 항목",
		key: "2",
		children: [
			{
				key: "2-1",
				label: "선택한 행",
			},
			{
				key: "2-2",
				label: "전체 행",
			},
		],
	},
];

const OrderListButtonExcel = ({ keysStore, modalStore }) => {

	const { searchKeyword, searchStatusList, searchData } = modalStore();
	const { datas } = keysStore();
	const { handleDownload, isPending } = useDownloadOrderListExcel();

	const headerDiv = "SALES";


	const onClick = (e) => {
		const ids = datas.map((data) => data.id);
		if (e.key === "1-1") {
			handleDownload(false, false, headerDiv, ids, searchKeyword, searchData, searchStatusList);
		} else if (e.key === "1-2") {
			handleDownload(false, true, headerDiv, ids, searchKeyword, searchData, searchStatusList);
		} else if (e.key === "2-1") {
			handleDownload(true, false, headerDiv, ids, searchKeyword, searchData, searchStatusList);
		} else if (e.key === "2-2") {
			handleDownload(true, true, headerDiv, ids, searchKeyword, searchData, searchStatusList);
		}
	}

	return (
		<Dropdown
			menu={{ items: excelItems, onClick }}
			className="excel-menu"
		>
			<Button>
				<Space>
					엑셀 다운로드
					<DownOutlined />
				</Space>
			</Button>
		</Dropdown>
	);
};

export default OrderListButtonExcel;
