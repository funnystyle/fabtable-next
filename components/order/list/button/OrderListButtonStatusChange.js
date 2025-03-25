// pages/order/create/index.js
import React from "react";
import { Button, Dropdown, Space, } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { putAxios } from "@api/apiClient";
import useTableSelectKeysStore from "@store/useTableSelectKeysStore";
import { useGetRecords } from "@components/api/useGetRecords";

const OrderListButtonStatusChange = ({ statusList }) => {

	const stateStatusList = statusList.slice(11, 14).map((item, i) => ({label: item, key: `${i + 11}`}));

	const { mutate: nowStateChange } = useMutation({
		mutationKey: "nowStateChange",
		mutationFn: (values) => putAxios("/user/record", values),
	});

	const { handleReload } = useGetRecords();
	const { selectedRowKeys } = useTableSelectKeysStore();

	const handleStatusChange = async (e) => {
		if (selectedRowKeys.length > 0) {
			await nowStateChange({ ids: selectedRowKeys, nowState: statusList[e.key] });
			setTimeout(() => {
				handleReload();
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
