// pages/order/create/index.js
import React from "react";
import { Button, Dropdown, Space, } from "antd";
import { DownOutlined, RedoOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { putAxios } from "@api/apiClient";

const OrderListButtonStatusChange = ({ statusList, stateStatusList, selectedRowKeys, handleSearch }) => {

	const { mutate: nowStateChange } = useMutation({
		mutationKey: "nowStateChange",
		mutationFn: (values) => putAxios("/user/record", values),
	});

	const handleStatusChange = async (e) => {
		if (selectedRowKeys.length > 0) {
			await nowStateChange({ ids: selectedRowKeys, nowState: statusList[e.key] });
			setTimeout(() => {
				handleSearch();
			}, 100);
		}
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
