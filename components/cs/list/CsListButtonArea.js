// pages/order/create/index.js
import React, { useEffect } from "react";
import { Button, Flex, } from "antd";
import OrderListButtonAllList from "@components/order/list/button/OrderListButtonAllList";
import OrderListButtonStatusSelect from "@components/order/list/button/OrderListButtonStatusSelect";
import useCsDataStore from "@store/useCsDataStore";
import OrderListButtonStatusChange from "@components/order/list/button/OrderListButtonStatusChange";
import { useSetCsState } from "@components/api/useSetCsState";
import CsCopyButton from "@components/cs/list/button/CsCopyButton";
import { useGetCodeList } from "@components/api/useGetCodeList";
import useCsListSearchCsModalStore from "@store/useCsListSearchCsModalStore";
import useCsListHistoryCsModalStore from "@store/useCsListHistoryCsModalStore";
import CsHistoryButton from "@components/cs/list/button/CsHistoryButton";
import useTableSelectKeysCsListStore from "@store/useTableSelectKeysCsListStore";
import OrderListButtonTotalInfo from "@components/order/list/button/OrderListButtonTotalInfo";

const CsListButtonArea = ({ handleReload }) => {

	const { setDeleteTagKeyName, searchStatusList, setSearchStatusList, setSearchKeyword } = useCsListSearchCsModalStore();
	const { datas, selectedRowKeys} = useTableSelectKeysCsListStore();
	const { tags, setTags } = useCsDataStore();

	const { handleReload:nowStatusUpdate } = useSetCsState();

	const { codeNameList, isSuccess } = useGetCodeList("CS상태");

	useEffect(() => {
		if (isSuccess) {
			setSearchStatusList(codeNameList);
		}
	}, [isSuccess]);

	return (
		<Flex gap="small" align="center" className="btn-big" style={{
			position: "sticky",
			top: "0",
			zIndex: "10",
			paddingBottom: "12px",
			paddingTop: "8px",
			backgroundColor: "#FFF",
		}}>
				<OrderListButtonAllList
					setDeleteTagKeyName={setDeleteTagKeyName}
					setSearchStatusList={setSearchStatusList}
					setSearchKeyword={setSearchKeyword}
					statusList={codeNameList}
					tags={tags}
					setTags={setTags}
				/>

				<Flex gap="small" className="btn-spacing-area">
				  <OrderListButtonTotalInfo datas={datas.map((item) => { return {id:item.recordId, serialNumber:item.serialNumber}})}/>

					<CsHistoryButton openLength={selectedRowKeys.length} modalStore={useCsListHistoryCsModalStore}/>

					<OrderListButtonStatusSelect statusList={codeNameList.slice(1)} searchStatusList={searchStatusList} setSearchStatusList={setSearchStatusList} />

					<OrderListButtonStatusChange statusList={codeNameList.slice(1)} nowStatusUpdate={nowStatusUpdate} keysStore={useTableSelectKeysCsListStore}/>

					{/*<Dropdown*/}
					{/*	menu={{ items: operationItems, onClick: handleMenuClick }}*/}
					{/*>*/}
					{/*	<Button>*/}
					{/*		<Space>*/}
					{/*			구분별 보기*/}
					{/*			<DownOutlined />*/}
					{/*		</Space>*/}
					{/*	</Button>*/}
					{/*</Dropdown>*/}
				</Flex>

			<Flex gap="small" className="btn-spacing-area">
				<CsCopyButton />

				<Button>항목편집</Button>

				{/*<Dropdown*/}
				{/*	menu={{ items: excelItems, onClick: handleMenuClick }}*/}
				{/*	className="excel-menu"*/}
				{/*>*/}
				{/*	<Button>*/}
				{/*		<Space>*/}
				{/*			엑셀 다운로드*/}
				{/*			<DownOutlined />*/}
				{/*		</Space>*/}
				{/*	</Button>*/}
				{/*</Dropdown>*/}

				{/*<Dropdown menu={{ items: printItems }}>*/}
				{/*	<Button>*/}
				{/*		<Space>*/}
				{/*			출력하기*/}
				{/*			<DownOutlined />*/}
				{/*		</Space>*/}
				{/*	</Button>*/}
				{/*</Dropdown>*/}
			</Flex>
				{/*<Flex gap="small" className="btn-spacing-area">*/}
				{/*	<OrderListButtonCopy />*/}

				{/*	<OrderListButtonEdit  />*/}
				{/*</Flex>*/}

				{/*<Flex gap="small">*/}
				{/*	<Button>항목편집</Button>*/}

				{/*	<OrderListButtonExcel />*/}

				{/*	<OrderListButtonPrint />*/}
				{/*</Flex>*/}
			</Flex>
		// </div>
	);
};

export default CsListButtonArea;
