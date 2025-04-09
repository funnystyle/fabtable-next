import React from "react";
import { Button, Flex, Tooltip } from "antd";
import { SettingOutlined } from "@ant-design/icons";

const OrderPacking = () => {
	return (
		<div className="tab-content-in top-h">
			<Flex align="center" justify="space-between" className="title-bg-blue">
				<p className="titie-info">포장 및 입고정보</p>

				<p>
					{/* <Button icon={<SettingOutlined />} size="small" /> */}
				</p>
			</Flex>

			<Flex className="order-info-wrap">
				<div>
					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="포장 작업자">
								<span>포장 작업자</span>
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
							<Tooltip title="포장 완료일">
								<span>포장 완료일</span>
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
							<Tooltip title="입고 작업자">
								<span>입고 작업자</span>
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
							<Tooltip title="입고 완료일">
								<span>입고 완료일</span>
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

export default OrderPacking;
