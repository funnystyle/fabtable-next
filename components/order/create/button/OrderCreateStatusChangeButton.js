// pages/order/create/index.js
import React from "react";
import {Button, Dropdown, Space,} from "antd";
import {DownOutlined} from "@ant-design/icons";
import useTableSelectKeysStore from "@store/useTableSelectKeysStore";
import {useGetCodeList} from "@components/api/useGetCodeList";
import {useSetCsState} from "@components/api/useSetCsState";
import useCsDataStore from "@store/useCsDataStore";
import {transformTagDataSingle} from "@components/order/table/transformTagData";
import {useSetNowState} from "@components/api/useSetNowState";
import useRecordDataStore from "@store/useRecordDataStore";

const OrderCreateStatusChangeButton = () => {

	const { record, tagInfoList, setNowState } = useRecordDataStore();
	const { codeNameList } = useGetCodeList("현재상태");
	const { handleReload:nowSatusUpdate } = useSetNowState();

	const handleStatusChange = async (e) => {

		await nowSatusUpdate([record.id], codeNameList.slice(11, 14)[e.key]);

		setNowState(transformTagDataSingle(tagInfoList, codeNameList.slice(11, 14)[e.key]));
	}

	return (
		<Dropdown
			menu={{ items: codeNameList.slice(11, 14).map((item, i) => ({label: item, key: `${i}`})), onClick: handleStatusChange }}
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

export default OrderCreateStatusChangeButton;
