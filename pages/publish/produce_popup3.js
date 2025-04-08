// pages/produce_popup3.js
import React from "react";
import { Flex, Typography, Splitter, Tabs } from "antd";

const { Title } = Typography;

// 내용 컴포넌트
import ProduceUnfit from "./components/ProduceUnfit";
import ProduceUnfitDetail from "./components/ProduceUnfitDetail";
import ProduceUnfitAction from "./components/ProduceUnfitAction";

const { TabPane } = Tabs;

const ProducePop3Component = () => {
	return (
		<div className="system-popup-wrap">
			<Flex
				align="center"
				justify="space-between"
				className="system-title-area"
			>
				<Title level={3} className="title-page">
					부적합 관리
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
				<Splitter layout="vertical">
					<Splitter.Panel>
						<Title level={4} className="title-bullet">
							부적합 현황
						</Title>

						<ProduceUnfit />
					</Splitter.Panel>

					<Splitter.Panel>
						<Splitter>
							<Splitter.Panel>
								<Title level={4} className="title-bullet">
									부적합 및 조치사항
								</Title>

								{/* 부적합 등록 및 상세정보 */}
								<ProduceUnfitDetail />

								{/* 부적합추가 버튼 클릭시 display:none 처리 */}
								{/* 주석 풀고 사용
								<p className="layer-cover"></p> 
								*/}
							</Splitter.Panel>

							<Splitter.Panel>
								{/* 조치사항 등록 및 상세정보 */}
								<ProduceUnfitAction />

								{/* rework 결정 클릭시 display:none 처리 */}
								{/* 주석 풀고 사용
								<p className="layer-cover"></p> 
								*/}
							</Splitter.Panel>
						</Splitter>
					</Splitter.Panel>
				</Splitter>
			</div>
		</div>
	);
};

ProducePop3Component.getLayout = (page) => page;

export default ProducePop3Component;
