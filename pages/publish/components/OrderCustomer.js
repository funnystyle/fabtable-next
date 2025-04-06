import React from "react";
import { Button, Flex, Tooltip } from "antd";
import { SettingOutlined } from "@ant-design/icons";

const OrderCustomer = () => {
	return (
		<div className="tab-content-in top-h">
			<Flex align="center" justify="space-between" className="title-bg-blue">
				<p className="titie-info">고객정보</p>

				<p>
					<Button icon={<SettingOutlined />} size="small" />
				</p>
			</Flex>

			<Flex className="order-info-wrap">
				<div>
					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="납품처">
								<span>납품처</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="아이마켓(SEMES)">
								<span>아이마켓(SEMES)</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="고객사">
								<span>고객사</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="아이코어시스템즈코리아">
								<span>아이코어시스템즈코리아</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="출고종류">
								<span>출고종류</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="출고종류">
								<span>출고종류</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="P/O번호">
								<span>P/O번호</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="2545RU122">
								<span>2545RU122</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="프로젝트번호">
								<span>프로젝트번호</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="1245895622">
								<span>1245895622</span>
							</Tooltip>
						</div>
					</Flex>
				</div>
			</Flex>
		</div>
	);
};

export default OrderCustomer;
