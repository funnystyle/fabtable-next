// pages/order/create/index.js
import React from "react";
import {Button, Flex,} from "antd";
import OrderListButtonAllList from "@components/order/list/button/OrderListButtonAllList";
import OrderListButtonTotalInfo from "@components/order/list/button/OrderListButtonTotalInfo";
import OrderListButtonStatusSelect from "@components/order/list/button/OrderListButtonStatusSelect";
import OrderListButtonStatusChange from "@components/order/list/button/OrderListButtonStatusChange";
import OrderListButtonCopy from "@components/order/list/button/OrderListButtonCopy";
import OrderListButtonEdit from "@components/order/list/button/OrderListButtonEdit";
import OrderListButtonExcel from "@components/order/list/button/OrderListButtonExcel";
import OrderListButtonPrint from "@components/order/list/button/OrderListButtonPrint";

const OrderListButtonArea = ({
	statusList,
 setOpenDrawer, setDrawerHeader, setDrawerContent, setDrawerFooter, setDrawerTitle,
}) => {

	return (
		<div className="contents-top-scroll">
			<Flex gap="small" align="center" className="btn-big">
				<OrderListButtonAllList />

				<Flex gap="small" className="btn-spacing-area">
					<OrderListButtonTotalInfo />

					<OrderListButtonStatusSelect statusList={statusList} />

					<OrderListButtonStatusChange statusList={statusList} />
				</Flex>

				<Flex gap="small" className="btn-spacing-area">
					<OrderListButtonCopy />

					<OrderListButtonEdit  />
				</Flex>

				<Flex gap="small">
					<Button>항목편집</Button>

					<OrderListButtonExcel />

					<OrderListButtonPrint
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
