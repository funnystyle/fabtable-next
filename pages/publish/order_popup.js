// pages/order_popup.js
import React, { useState, useEffect } from "react";
import {
	Flex,
	Typography,
	Button,
	Splitter,
	Tabs,
	Radio,
	Input,
	Select,
	Tag,
	DatePicker,
	Tooltip,
} from "antd";
import { LeftOutlined, RightOutlined, UploadOutlined } from "@ant-design/icons";

const { Title } = Typography;

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;

// 내용 컴포넌트
import OrderBasic from "./components/OrderBasic";
import OrderCustomer from "./components/OrderCustomer";
import OrderProduct from "./components/OrderProduct";
import OrderMemo from "./components/OrderMemo";

import OrderAssembly from "./components/OrderAssembly";
import OrderLeak from "./components/OrderLeak";
import OrderPID from "./components/OrderPID";
import OrderCase from "./components/OrderCase";
import OrderPI from "./components/OrderPI";
import OrderPacking from "./components/OrderPacking";

import OrderCorrect from "./components/OrderCorrect";

const { TabPane } = Tabs;

const OrderPopComponent = () => {
	return (
		<div className="system-popup-wrap">
			<Flex
				align="center"
				justify="space-between"
				className="system-title-area"
			>
				<Title level={3} className="title-page">
					수주 종합정보
				</Title>

				<Flex
					align="center"
					justify="space-between"
					className="control-info-area"
				>
					<p>530240902012</p>
					<p>A24-00019</p>
					<p>MARU 7001</p>
				</Flex>
			</Flex>

			<div className="popup-contents pd0">
				<Flex gap={4} className="btn-r-area">
					<Button color="primary" variant="outlined" size="small">
						부적합 이력
					</Button>

					<Button color="primary" variant="outlined" size="small">
						제어계수
					</Button>

					<Button color="primary" variant="outlined" size="small">
						비율제어
					</Button>
				</Flex>

				<Tabs defaultActiveKey="1" type="card" className="tab-round">
					{/* 메인 탭 1: 수주 정보 */}
					<TabPane tab="수주 정보" key="1">
						<Splitter>
							<Splitter.Panel defaultSize="28%" collapsible>
								<Splitter layout="vertical">
									<Splitter.Panel>
										{/* 기본정보 */}
										<OrderBasic />
									</Splitter.Panel>

									<Splitter.Panel>
										{/* 고객정보 */}
										<OrderCustomer />
									</Splitter.Panel>
								</Splitter>
							</Splitter.Panel>

							<Splitter.Panel collapsible>
								{/* 재품 정보 */}
								<OrderProduct />
							</Splitter.Panel>

							<Splitter.Panel collapsible>
								{/* 메모 */}
								<OrderMemo />
							</Splitter.Panel>
						</Splitter>
					</TabPane>

					{/* 메인 탭 2: 제조 정보 */}
					<TabPane tab="제조 정보" key="2">
						<Splitter>
							<Splitter.Panel defaultSize="28%" collapsible>
								{/* 조립정보 */}
								<OrderAssembly />
							</Splitter.Panel>

							<Splitter.Panel defaultSize="28%" collapsible>
								<Splitter layout="vertical">
									<Splitter.Panel>
										{/* 리크정보 */}
										<OrderLeak />
									</Splitter.Panel>

									<Splitter.Panel defaultSize="16%">
										{/* PID정보 */}
										<OrderPID />
									</Splitter.Panel>

									<Splitter.Panel defaultSize="12%">
										{/* 케이스 조립정보 */}
										<OrderCase />
									</Splitter.Panel>

									<Splitter.Panel defaultSize="16%">
										{/* PI정보 */}
										<OrderPI />
									</Splitter.Panel>

									<Splitter.Panel defaultSize="20%">
										{/* 포장 및 입고정보 */}
										<OrderPacking />
									</Splitter.Panel>
								</Splitter>
							</Splitter.Panel>

							<Splitter.Panel collapsible>
								{/* 교정정보 */}
								<OrderCorrect />
							</Splitter.Panel>
						</Splitter>
					</TabPane>

					{/* 메인 탭 2: 품질 정보 */}
					<TabPane tab="품질 정보" key="3"></TabPane>
				</Tabs>
			</div>
		</div>
	);
};

OrderPopComponent.getLayout = (page) => page;

export default OrderPopComponent;
