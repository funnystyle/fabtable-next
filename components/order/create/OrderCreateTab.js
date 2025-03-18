// pages/order/create/index.js
import React from "react";
import { Tabs, } from "antd";
import { useRouter } from "next/router";

const TabItems = [
	{
		key: 1,
		label: "수주 현황 목록",
	},
	{
		key: 2,
		label: "수주 등록 · 상세",
	},
];

const OrderCreateTab = ({ activeKey }) => {
	const router = useRouter();

	const onTabChange = (key) => {
		if (key === 1) {
			router.push("/order/list");
		} else if (key === 2) {
			router.push("/order/create");
		}
	};
	return (
		<Tabs defaultActiveKey={activeKey} items={TabItems} onChange={onTabChange} />
	);
};

export default OrderCreateTab;
