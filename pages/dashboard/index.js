"use client";

// pages/dashboard/index.js
import React from "react";
import {Layout, Flex, Typography,} from "antd";

const { Title } = Typography;

const DashboardComponent = ({ contentHeight }) => {

	return (
		<Layout>
      <div className="contents-flex">
        <Flex align="center" justify="space-between" className="title-area">
          <Title level={2} className="title-page">
            대시보드
          </Title>
        </Flex>
      </div>
		</Layout>
	);
};

export default DashboardComponent;
