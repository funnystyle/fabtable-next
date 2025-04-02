// pages/order/create/index.js
import React from "react";
import {Button, Dropdown, Flex, Space,} from "antd";
import OrderListButtonAllList from "@components/order/list/button/OrderListButtonAllList";
import OrderListButtonTotalInfo from "@components/order/list/button/OrderListButtonTotalInfo";
import OrderListButtonStatusSelect from "@components/order/list/button/OrderListButtonStatusSelect";
import useCsSearchModalStore from "@store/useCsSearchModalStore";
import useCsDataStore from "@store/useCsDataStore";
import {DownOutlined} from "@ant-design/icons";

const CsListButtonArea = ({ statusList }) => {

	const { setDeleteTagKeyName, searchStatusList, setSearchStatusList, setSearchKeyword } = useCsSearchModalStore();
	const { tags, setTags } = useCsDataStore();

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
					statusList={statusList}
					tags={tags}
					setTags={setTags}
				/>

				<Flex gap="small" className="btn-spacing-area">
					<Button variant="outlined">C/S 이력</Button>

					<OrderListButtonStatusSelect statusList={statusList.slice(1)} searchStatusList={searchStatusList} setSearchStatusList={setSearchStatusList} />

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
				<Button>C/S 복제하기</Button>

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
