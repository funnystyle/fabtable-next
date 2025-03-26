// pages/order/create/index.js
import React from "react";
import {Flex, Typography,} from "antd";

const { Title } = Typography;

const CsCreateTitle = ({ title }) => {

	return (
		<Flex align="center" justify="space-between" className="title-area">
			<Title level={2} className="title-page">
				{title}
			</Title>
		</Flex>
	);
};

export default CsCreateTitle;
