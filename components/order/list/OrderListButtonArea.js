// pages/order/create/index.js
import React, { useState } from "react";
import { Button, Flex, Tag, } from "antd";
import OrderListButtonAllList from "@components/order/list/button/OrderListButtonAllList";
import OrderListButtonTotalInfo from "@components/order/list/button/OrderListButtonTotalInfo";
import OrderListButtonStatusSelect from "@components/order/list/button/OrderListButtonStatusSelect";
import OrderListButtonStatusChange from "@components/order/list/button/OrderListButtonStatusChange";
import OrderListButtonCopy from "@components/order/list/button/OrderListButtonCopy";
import OrderListButtonEdit from "@components/order/list/button/OrderListButtonEdit";
import OrderListButtonExcel from "@components/order/list/button/OrderListButtonExcel";
import OrderListButtonPrint from "@components/order/list/button/OrderListButtonPrint";

const OrderListButtonArea = ({
	statusList, setStatusList,
	searchStatusList, setSearchStatusList,
	stateStatusList, setStateStatusList,
	selectedRowKeys, handleSearch,
	setCopyModalBoxList, showCopyModal,
	setEditModalBoxList, showEditModal,
	setOpenDrawer, setDrawerHeader, setDrawerContent, setDrawerFooter, setDrawerTitle,
}) => {

	return (
		<div className="contents-top-scroll">
			<Flex gap="small" align="center" className="btn-big">
				<OrderListButtonAllList />

				<Flex gap="small" className="btn-spacing-area">
					<OrderListButtonTotalInfo />

					<OrderListButtonStatusSelect
						statusList={statusList} setStatusList={setStatusList}
						searchStatusList={searchStatusList} setSearchStatusList={setSearchStatusList}
						setStateStatusList={setStateStatusList}
					/>

					<OrderListButtonStatusChange statusList={statusList} stateStatusList={stateStatusList} selectedRowKeys={selectedRowKeys} handleSearch={handleSearch} />
				</Flex>

				<Flex gap="small" className="btn-spacing-area">
					<OrderListButtonCopy setCopyModalBoxList={setCopyModalBoxList} showCopyModal={showCopyModal} />

					<OrderListButtonEdit setEditModalBoxList={setEditModalBoxList} showEditModal={showEditModal} />
				</Flex>

				<Flex gap="small">
					<Button>항목편집</Button>

					<OrderListButtonExcel />

					<OrderListButtonPrint
						selectedRowKeys={selectedRowKeys}
						setOpenDrawer={setOpenDrawer}
						setDrawerHeader={setDrawerHeader}
						setDrawerContent={setDrawerContent}
						setDrawerFooter={setDrawerFooter}
						setDrawerTitle={setDrawerTitle}
					/>
				</Flex>
			</Flex>
		</div>
	);
};

export default OrderListButtonArea;
