// pages/order/create/index.js
import React from "react";
import {Button, Dropdown, Space,} from "antd";
import {DownOutlined} from "@ant-design/icons";
import useTableSelectKeysStore from "@store/useTableSelectKeysStore";
import {useGetCodeList} from "@components/api/useGetCodeList";
import {useSetCsState} from "@components/api/useSetCsState";
import useCsDataStore from "@store/useCsDataStore";
import {transformTagDataSingle} from "@components/order/table/transformTagData";

const CsCreateStatusChangeButton = () => {

	const { cs, tagInfoList, setCsState } = useCsDataStore();
	const { codeNameList } = useGetCodeList("CS상태");
	const { handleReload:nowSatusUpdate } = useSetCsState();

	const handleStatusChange = async (e) => {

		await nowSatusUpdate([cs.id], codeNameList.slice(1)[e.key]);

		setCsState(transformTagDataSingle(tagInfoList, codeNameList.slice(1)[e.key]));
	}

	return (
		<Dropdown
			menu={{ items: codeNameList.slice(1).map((item, i) => ({label: item, key: `${i}`})), onClick: handleStatusChange }}
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

export default CsCreateStatusChangeButton;
