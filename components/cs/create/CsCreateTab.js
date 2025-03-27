// pages/order/create/index.js
import React from "react";
import {Tabs,} from "antd";
import {useRouter} from "next/router";

const TabItems = [
	{
		key: 1,
		label: "C/S 현황 목록",
	},
	{
		key: 2,
		label: "C/S 등록 · 상세",
	},
];

const CsCreateTab = ({ activeKey }) => {
	const router = useRouter();

	const onTabChange = (key) => {
		if (key === 1) {
			router.push("/cs/list");
		} else if (key === 2) {
			router.push("/cs/create");
		}
	};
	return (
		<Tabs defaultActiveKey={activeKey} items={TabItems} onChange={onTabChange} />
	);
};

export default CsCreateTab;
