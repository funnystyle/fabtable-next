import React from "react";
import { Button, Flex, Tooltip } from "antd";
import { SettingOutlined } from "@ant-design/icons";

const OrderAssembly = () => {
	return (
		<div className="tab-content-in top-h">
			<Flex align="center" justify="space-between" className="title-bg-blue">
				<p className="titie-info">조립정보</p>

				<p>
					<Button icon={<SettingOutlined />} size="small" />
				</p>
			</Flex>

			<Flex className="order-info-wrap">
				<div>
					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="보빈 시리얼">
								<span>보빈 시리얼</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="2021487452445455455">
								<span>2021487452445455455</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="밸브블럭 시리얼">
								<span>밸브블럭 시리얼</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="2021487452445455455">
								<span>2021487452445455455</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="하우징 시리얼">
								<span>하우징 시리얼</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="2021487452445455455">
								<span>2021487452445455455</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="노즐 시리얼">
								<span>노즐 시리얼</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="2021487452445455455">
								<span>2021487452445455455</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="플런저 시리얼">
								<span>플런저 시리얼</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="2021487452445455455">
								<span>2021487452445455455</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="바이패스 시리얼">
								<span>바이패스 시리얼</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="2021487452445455455">
								<span>2021487452445455455</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="바디 시리얼">
								<span>바디 시리얼</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="161303254SD-003">
								<span>161303254SD-003</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="압력센서 시리얼">
								<span>압력센서 시리얼</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="1222364-295">
								<span>1222364-295</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="유량센서 시리얼">
								<span>유량센서 시리얼</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="4OD12-P16">
								<span>4OD12-P16</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="유량센서 히터저항(실측)">
								<span>유량센서 히터저항(실측)</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="852">
								<span>852</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="Aging Zero Shift">
								<span>Aging Zero Shift</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="-6">
								<span>-6</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="메인보드 구분">
								<span>메인보드 구분</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="SMT_MAIN_ATOM">
								<span>SMT_MAIN_ATOM</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="메인보드 버전">
								<span>메인보드 버전</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="V13">
								<span>V13</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="메인보드 시리얼">
								<span>메인보드 시리얼</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="2342-0322">
								<span>2342-0322</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="펌웨어 버전">
								<span>펌웨어 버전</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="19.03">
								<span>19.03</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="제조 버전">
								<span>제조 버전</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="2300145216.010">
								<span>2300145216.010</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="노즐경">
								<span>노즐경</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="0.6">
								<span>0.6</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="바이패스 사양">
								<span>바이패스 사양</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="G25X25">
								<span>G25X25</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="바이패스 개수">
								<span>바이패스 개수</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="24">
								<span>24</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="리스트릭터 두께">
								<span>리스트릭터 두께</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="-">
								<span>-</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="리스트릭터 홀 개수">
								<span>리스트릭터 홀 개수</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="-">
								<span>-</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="Pusher 구분 (구 형태)">
								<span>Pusher 구분 (구 형태)</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="벨로우즈">
								<span>벨로우즈</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="압력센서 구분">
								<span>압력센서 구분</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="INFICON (30torr 이하)">
								<span>INFICON (30torr 이하)</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="장착MFC 정보">
								<span>장착MFC 정보</span>
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

export default OrderAssembly;
