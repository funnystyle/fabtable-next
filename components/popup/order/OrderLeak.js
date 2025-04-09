import React from "react";
import { Button, Flex, Tooltip } from "antd";
import { SettingOutlined } from "@ant-design/icons";

const OrderLeak = () => {
	return (
		<div className="tab-content-in top-h">
			<Flex align="center" justify="space-between" className="title-bg-blue">
				<p className="titie-info">리크정보</p>

				<p>
					{/* <Button icon={<SettingOutlined />} size="small" /> */}
				</p>
			</Flex>

			<Flex className="order-info-wrap">
				<div>
					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="내부리크 초기압력">
								<span>내부리크 초기압력</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="0">
								<span>0</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="내부리크 나중압력">
								<span>내부리크 나중압력</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="0">
								<span>0</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="내부리크 압력">
								<span>내부리크 압력</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="0">
								<span>0</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="내부리크 유량">
								<span>내부리크 유량</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="1,000">
								<span>1,000</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="외부리크 진공수치">
								<span>외부리크 진공수치</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="5.0E-12">
								<span>5.0E-12</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="내부리크 검사자">
								<span>내부리크 검사자</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="김길동">
								<span>김길동</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="내부리크 검사일">
								<span>내부리크 검사일</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="2025-08-17   17:00">
								<span>2025-08-17 17:00</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="외부리크 검사자">
								<span>외부리크 검사자</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="김길동">
								<span>김길동</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="외부리크 검사일">
								<span>외부리크 검사일</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="2025-08-17   17:00">
								<span>2025-08-17 17:00</span>
							</Tooltip>
						</div>
					</Flex>
				</div>
			</Flex>
		</div>
	);
};

export default OrderLeak;
