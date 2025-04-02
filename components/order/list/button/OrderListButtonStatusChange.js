// pages/order/create/index.js
import React from "react";
import {Button, Dropdown, message, Space,} from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { putAxios } from "@api/apiClient";
import useTableSelectKeysStore from "@store/useTableSelectKeysStore";

const OrderListButtonStatusChange = ({ statusList, nowSatusUpdate }) => {

	const stateStatusList = statusList.map((item, i) => ({label: item, key: `${i}`}));

	const { datas } = useTableSelectKeysStore();

	const handleStatusChange = async (e) => {
		if (datas.length <= 0) return;

		nowSatusUpdate(datas.map((data) => data.id), statusList[e.key]);
	}

	return (
		<Dropdown
			menu={{ items: stateStatusList, onClick: handleStatusChange }}
		>
			<Button>
				<Space>
					상태변경
					<DownOutlined />
				</Space>
			</Button>
		</Dropdown>
	);
};

export default OrderListButtonStatusChange;
