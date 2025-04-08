import React from "react";
import { Button, Flex, Tooltip } from "antd";
import { SettingOutlined } from "@ant-design/icons";

const OrderBasic = () => {
	return (
		<div className="tab-content-in top-h">
			<Flex align="center" justify="space-between" className="title-bg-blue">
				<p className="titie-info">기본정보</p>

				<p>
					<Button icon={<SettingOutlined />} size="small" />
				</p>
			</Flex>

			<Flex className="order-info-wrap">
				<div>
					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="시리얼번호">
								<span>시리얼번호</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="530240902012">
								<span>530240902012</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="제조번호">
								<span>제조번호</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="A2025-000025">
								<span>A2025-000025</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="납품계획일">
								<span>납품계획일</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="2025-08-22   00:00">
								<span>2025-08-22 00:00</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="생산계획일">
								<span>생산계획일</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="2025-08-22   00:00">
								<span>2025-08-22 00:00</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="검사계획일">
								<span>검사계획일</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="2025-08-22   00:00">
								<span>2025-08-22 00:00</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="생산부서">
								<span>생산부서</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="제조2팀 (2)">
								<span>제조2팀 (2)</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="등록자">
								<span>등록자</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="홍길동">
								<span>홍길동</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="등록일">
								<span>등록일</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="2025-07-01   00:00">
								<span>2025-07-01 00:00</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="납품자">
								<span>납품자</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="이몽룡">
								<span>이몽룡</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="납품일">
								<span>납품일</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="2025-07-01   00:00">
								<span>2025-07-01 00:00</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="비고">
								<span>비고</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="-">
								<span>-</span>
							</Tooltip>
						</div>
					</Flex>
				</div>
			</Flex>
		</div>
	);
};

export default OrderBasic;
