// pages/order/create/index.js
import React, { useEffect, useState } from "react";
import { Flex, Form, Layout, Typography, } from "antd";
import { useQuery } from "@tanstack/react-query";
import { getAxios } from "@api/apiClient";
import { handleInputBoxRow } from "@components/inputForm/handleInputBoxRow";
import OrderCreateHeaderNew from "@components/order/create/OrderCreateHeaderNew";
import OrderCreateAnchor from "@components/order/create/OrderCreateAnchor";
import OrderCreateTab from "@components/order/create/OrderCreateTab";

const { Title } = Typography;

const OrderCreateTitle = ({ title }) => {

	return (
		<Flex align="center" justify="space-between" className="title-area">
			<Title level={2} className="title-page">
				{title}
			</Title>
		</Flex>
	);
};

export default OrderCreateTitle;
