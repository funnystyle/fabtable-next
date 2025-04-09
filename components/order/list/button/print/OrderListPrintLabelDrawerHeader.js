// pages/order/create/index.js
import React from "react";
import { Button, Flex, } from "antd";

const OrderListPrintLabelDrawerHeader = ({closeDrawer, handlePrint}) => {
	return (
		<Flex align="center" justify="space-between" className="drawer-top">
			<Flex align="center" gap={10}>
				<h1 className="title-drawer">인쇄하기</h1>
				<p className="drawer-descript">총 52 페이지</p>
			</Flex>
			<Flex gap={8} className="drawer-top-btn">
				<Button onClick={closeDrawer}>취소</Button>
				<Button type="primary"
								onClick={() => handlePrint()}
				>다음</Button>
			</Flex>
		</Flex>
	);

};

export default OrderListPrintLabelDrawerHeader;
