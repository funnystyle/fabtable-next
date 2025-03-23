// pages/order/create/index.js
import React from "react";
import {Flex, Typography,} from "antd";
import OrderCreateOpenButton from "@components/order/create/button/OrderCreateOpenButton";

const { Title } = Typography;

const OrderCreateTitle = ({ title }) => {

	return (
		<Flex align="center" justify="space-between" className="title-area">
			<Title level={2} className="title-page">
				{title}
			</Title>

			<OrderCreateOpenButton />
		</Flex>
	);
};

export default OrderCreateTitle;
