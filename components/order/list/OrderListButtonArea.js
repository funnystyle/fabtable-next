// pages/order/create/index.js
import React from "react";
import { Button, Flex, } from "antd";
import OrderListButtonAllList from "@components/order/list/button/OrderListButtonAllList";
import OrderListButtonTotalInfo from "@components/order/list/button/OrderListButtonTotalInfo";
import OrderListButtonStatusSelect from "@components/order/list/button/OrderListButtonStatusSelect";
import OrderListButtonStatusChange from "@components/order/list/button/OrderListButtonStatusChange";
import OrderListButtonCopy from "@components/order/list/button/OrderListButtonCopy";
import OrderListButtonEdit from "@components/order/list/button/OrderListButtonEdit";
import OrderListButtonExcel from "@components/order/list/button/OrderListButtonExcel";
import OrderListButtonPrint from "@components/order/list/button/OrderListButtonPrint";
import useRecordModalStore from "@store/useRecordModalStore";
import useRecordDataStore from "@store/useRecordDataStore";
import { useGetRecords } from "@components/api/useGetRecords";

const OrderListButtonArea = ({ statusList }) => {

	const { setDeleteTagKeyName, searchStatusList, setSearchStatusList, setSearchKeyword } = useRecordModalStore();
	const { tags, setTags } = useRecordDataStore();
	const { handleReload } = useGetRecords();

	return (
		// <div className="contents-top-scroll">
			<Flex gap="small" align="center" className="btn-big" style={{
				position: "sticky",
				top: "0",
				zIndex: "10",
				marginBottom: "12px",
				// paddingTop: "8px",
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
					<OrderListButtonTotalInfo />

					<OrderListButtonStatusSelect statusList={statusList} searchStatusList={searchStatusList} setSearchStatusList={setSearchStatusList} />

					<OrderListButtonStatusChange statusList={statusList} handleReload={handleReload}/>
				</Flex>

				<Flex gap="small" className="btn-spacing-area">
					<OrderListButtonCopy />

					<OrderListButtonEdit  />
				</Flex>

				<Flex gap="small">
					<Button>항목편집</Button>

					<OrderListButtonExcel />

					<OrderListButtonPrint />
				</Flex>
			</Flex>
		// </div>
	);
};

export default OrderListButtonArea;
