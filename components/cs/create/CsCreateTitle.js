// pages/order/create/index.js
import React from "react";
import {Flex, Typography,} from "antd";
import CsCreateOpenButton from "@components/cs/create/button/CsCreateOpenButton";

const { Title } = Typography;

const CsCreateTitle = ({ title }) => {

	return (
		<Flex align="center" justify="space-between" className="title-area">
			<Title level={2} className="title-page">
				{title}
			</Title>

			<CsCreateOpenButton title={"CS 불러오기"} />
		</Flex>
	);
};

export default CsCreateTitle;
