// pages/order.js
import React, { useState } from "react";
import {
	Layout,
	Button,
	Flex,
	Dropdown,
	Space,
	Divider,
	Form,
	Select,
	Row,
	Col,
	Radio,
} from "antd";
import { DownOutlined } from "@ant-design/icons";

import DrawerComponent from "@publish/components/drawer";

const CustomeDrawerComponent = () => {
	const handleChange = (pagination, filters, sorter = {}) => {
		console.log("Various parameters", pagination, filters, sorter);
		setSortedInfo(sorter.columnKey ? sorter : {});
	};

	// --------- 드로어 관련
	const [openDrawer, setOpenDrawer] = useState(false); // Drawer 열림 상태
	const [drawerHeader, setDrawerHeader] = useState(null); // Drawer 헤더
	const [drawerContent, setDrawerContent] = useState(null); // Drawer 본문 내용
	const [drawerFooter, setDrawerFooter] = useState(null); // Drawer 푸터 버튼
	const [drawerTitle, setDrawerTitle] = useState(""); // Drawer 제목 상태

	// 드로어 열기
	const showDrawer = (type) => {
		setDrawerTitle("인쇄 설정");
		setDrawerHeader(
			<Flex align="center" justify="space-between" className="drawer-top">
				<Flex align="center" gap={10}>
					<h1 className="title-drawer">인쇄하기</h1>
					<p className="drawer-descript">총 52 페이지</p>
				</Flex>
				<Flex gap={8} className="drawer-top-btn">
					<Button onClick={closeDrawer}>취소</Button>
					<Button type="primary">다음</Button>
				</Flex>
			</Flex>
		);

		if (type === "label") {
			setDrawerContent(
				<>
					<Form layout="vertical">
						<Flex align="center" gap={4} className="tit-area">
							<p className="tit-type no-bullet">인쇄 구분</p>
						</Flex>

						<Form.Item>
							<Select
								defaultValue="print1"
								onChange={handleChange}
								options={[
									{
										value: "print1",
										label: "라벨 인쇄",
									},
									{
										value: "print2",
										label: "성적서 인쇄",
									},
								]}
							/>
						</Form.Item>

						<Flex align="center" gap={4} className="tit-area">
							<p className="tit-type no-bullet">라벨 설정</p>

							<Button type="link" className="btn-reset-txt">
								설정 초기화
							</Button>
						</Flex>

						<Row gutter={16}>
							<Col span={24}>
								<Form.Item label="라벨 종류" name="radio1">
									<Radio.Group
										style={{
											display: "flex",
											flexDirection: "column",
											gap: 8,
										}}
									>
										<Radio value="radio1-1">라벨 1 --&gt; 2 --&gt; 3</Radio>
										<Radio value="radio1-2">라벨 1</Radio>
										<Radio value="radio1-3">라벨 2</Radio>
										<Radio value="radio1-4">라벨 3</Radio>
										<Radio value="radio1-5">라벨 4</Radio>
									</Radio.Group>
								</Form.Item>
							</Col>
						</Row>

						<Divider style={{ marginTop: 16, marginBottom: 16 }} />

						<Row gutter={16}>
							<Col span={24}>
								<Form.Item label="라벨 1 규격 (mm)" name="radio2">
									<Radio.Group
										style={{
											display: "flex",
											flexDirection: "column",
											gap: 8,
										}}
									>
										<Radio value="radio2-1">규격 1 (30*70)</Radio>
										<Radio value="radio2-2">규격 2 (40*70)</Radio>
									</Radio.Group>
								</Form.Item>
							</Col>
						</Row>

						<Row gutter={16}>
							<Col span={24}>
								<Form.Item label="라벨 2 규격 (mm)" name="radio3">
									<Radio.Group
										style={{
											display: "flex",
											flexDirection: "column",
											gap: 8,
										}}
									>
										<Radio value="radio3-1">규격 1 (35*70)</Radio>
										<Radio value="radio3-2">규격 2 (45*70)</Radio>
									</Radio.Group>
								</Form.Item>
							</Col>
						</Row>

						<Divider style={{ marginTop: 16, marginBottom: 16 }} />

						<Flex align="center" gap={4} className="tit-area">
							<p className="tit-type no-bullet">기타</p>

							<Button type="link" className="btn-reset-txt">
								설정 초기화
							</Button>
						</Flex>

						<Row gutter={16}>
							<Col span={24}>
								<Form.Item label="AS 연락처" name="radio4">
									<Radio.Group
										style={{
											display: "flex",
											flexDirection: "column",
											gap: 8,
										}}
									>
										<Radio value="radio4-1">한국 본사</Radio>
										<Radio value="radio4-2">중국 상해법인</Radio>
									</Radio.Group>
								</Form.Item>
							</Col>
						</Row>

						<Row gutter={16}>
							<Col span={24}>
								<Form.Item label="장착 방향" name="radio5">
									<Radio.Group
										style={{
											display: "flex",
											flexDirection: "column",
											gap: 8,
										}}
									>
										<Radio value="radio5-1">정방향 ( &lt;-- ) </Radio>
										<Radio value="radio5-2">역방향 ( --&gt; ) </Radio>
									</Radio.Group>
								</Form.Item>
							</Col>
						</Row>
					</Form>
				</>
			);
		}

		setOpenDrawer(true);
	};

	// 드로어 닫기
	const closeDrawer = () => {
		setOpenDrawer(false);
	};
	// --------- 드로어 관련

	return (
		<Layout>
			<br />
			<Button onClick={() => showDrawer("label")} style={{ width: "60px" }}>
				<Space>인쇄하기</Space>
			</Button>
			{/* DrawerComponent 추가 - 상태와 닫기 핸들러 전달 */}
			<div style={{ display: openDrawer ? "block" : "none" }}>
				<DrawerComponent
					open={openDrawer}
					onClose={closeDrawer}
					title={drawerTitle}
					headerContent={drawerHeader} // 동적으로 헤더 변경
					content={drawerContent} // 동적으로 본문 변경
					footer={drawerFooter} // 동적으로 푸터 버튼 변경
				/>
			</div>
		</Layout>
	);
};

export default CustomeDrawerComponent;
