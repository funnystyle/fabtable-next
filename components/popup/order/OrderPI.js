import React from "react";
import { Button, Flex, Tooltip } from "antd";
import { SettingOutlined } from "@ant-design/icons";

const OrderPI = () => {
	return (
		<div className="tab-content-in top-h">
			<Flex align="center" justify="space-between" className="title-bg-blue">
				<p className="titie-info">PI정보</p>

				<p>
					<Button icon={<SettingOutlined />} size="small" />
				</p>
			</Flex>

			<Flex className="order-info-wrap">
				<div>
					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="보드 전류값">
								<span>보드 전류값</span>
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
							<Tooltip title="PI교정자">
								<span>PI교정자</span>
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
							<Tooltip title="PI교정일">
								<span>PI교정일</span>
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

export default OrderPI;
