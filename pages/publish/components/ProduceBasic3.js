import React from "react";
import { Button, Flex, Tooltip } from "antd";
import { SettingOutlined } from "@ant-design/icons";

const ProduceBasic3 = () => {
	return (
		<div className="tab-content-in">
			<Flex align="center" justify="space-between" className="title-bg-blue">
				<p className="titie-info">리크정보</p>

				<p>
					<Button icon={<SettingOutlined />} size="small" />
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
							<Tooltip title="0">
								<span>0</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="외부리크_진공수치">
								<span>외부리크_진공수치</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="5.0E-12">
								<span>5.0E-12</span>
							</Tooltip>
						</div>
					</Flex>
				</div>

				<div>
					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="내부리크 검사자">
								<span>내부리크 검사자</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="장원영">
								<span>장원영</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="내부리크 검사일시">
								<span>내부리크 검사일시</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="2024-08-22  10:40">
								<span>2024-08-22 10:40</span>
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
							<Tooltip title="박나래">
								<span>박나래</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="외부리크 검사일시">
								<span>외부리크 검사일시</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="2024-08-22  10:40">
								<span>2024-08-22 10:40</span>
							</Tooltip>
						</div>
					</Flex>
				</div>
			</Flex>
		</div>
	);
};

export default ProduceBasic3;
