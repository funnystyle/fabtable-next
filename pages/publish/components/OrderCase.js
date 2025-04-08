import React from "react";
import { Button, Flex, Tooltip } from "antd";
import { SettingOutlined } from "@ant-design/icons";

const OrderCase = () => {
	return (
		<div className="tab-content-in top-h">
			<Flex align="center" justify="space-between" className="title-bg-blue">
				<p className="titie-info">케이스 조립정보</p>

				<p>
					<Button icon={<SettingOutlined />} size="small" />
				</p>
			</Flex>

			<Flex className="order-info-wrap">
				<div>
					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="케이스 조립자">
								<span>케이스 조립자</span>
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
							<Tooltip title="케이스교정일">
								<span>케이스교정일</span>
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

export default OrderCase;
