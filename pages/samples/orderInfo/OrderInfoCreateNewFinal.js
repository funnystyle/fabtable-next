// pages/samples/orderInfo/OrderCreateNewFinal.js
import React, { useEffect, useState } from "react";
import { Anchor, Button, Flex, Form, Layout, message, Tabs, Tag, Typography, } from "antd";
import { useRouter } from "next/router";
import {useMutation, useQuery} from "@tanstack/react-query";
import {getAxios, postAxios} from "@api/apiClient";
import { handleInputBox } from "@components/inputForm/handleInputBox";
import InputBoxRow from "@components/inputForm/InputBoxRow";
import { CloseOutlined, EditFilled } from "@ant-design/icons";

const { Title } = Typography;

const onChange = (e) => {
	console.log(`checked = `);
};

const TabItems = [
	{
		key: "1",
		label: "수주 현황 목록",
	},
	{
		key: "2",
		label: "수주 등록 · 상세",
	},
];

const handleMenuClick = (e) => {
	message.info("Click on menu item.");
	console.log("click", e);
};

const stateItems = [
	{
		label: "납품완료",
		key: "1",
	},
	{
		label: "반출대기",
		key: "2",
	},
	{
		label: "반출완료",
		key: "3",
	},
];

const printItems = [
	{
		label: "라벨 인쇄",
		key: "1",
		onClick: () => showDrawer("label"), // 클릭 시 라벨 인쇄 Drawer 열기
	},
	{
		label: "성적서 인쇄",
		key: "2",
		onClick: () => showDrawer("report"), // 클릭 시 성적서 인쇄 Drawer 열기
	},
];

const handleChange = (pagination, filters, sorter = {}) => {
	console.log("Various parameters", pagination, filters, sorter);
	setSortedInfo(sorter.columnKey ? sorter : {});
};

const OrderInfoCreateNewFinal = ({ contentHeight }) => {
	const [position, setPosition] = useState("end");
	const router = useRouter();

	const onTabChange = (key) => {
		if (key === "1") {
			router.push("/order");
		} else if (key === "2") {
			router.push("/orderwrite");
		}
	};

	/* Anchor 스크롤 이동 */
	const handleAnchorClick = (e, link) => {
		e.preventDefault(); // 기본 이동 방지

		const targetId = link.href.split("#")[1]; // 타겟 ID 가져오기
		const targetElement = document.getElementById(targetId);

		if (targetElement) {
			// 기본정보(#basic)는 top 0으로 이동, 나머지는 -100px 조정
			const yOffset = -319;
			const y =
				targetElement.getBoundingClientRect().top + window.scrollY + yOffset;

			console.log(`Scrolling to ${targetId}:`, y);

			setTimeout(() => {
				window.scrollTo({ top: y, behavior: "smooth" });
			}, 100);
		}
	};
	/* //Anchor 스크롤 이동 */

	const [inputBoxList, setInputBoxList] = useState([]);
	const [queryKey, setQueryKey] = useState(["input-box-list", Math.random()]);
	const { data:inputBoxResponse, isLoading, isSuccess, isError } = useQuery({
		queryKey,
		queryFn: () => getAxios("/user/input-box", {type:"recordCreate"}),
	});
	useEffect(() => {
		if (isSuccess) {
			setInputBoxList(inputBoxResponse.data.list);
		}
	}, [isSuccess]);

	const { mutate: orderInfoCreate } = useMutation({
		mutationKey: "orderInfoCreate",
		mutationFn: (values) => postAxios("/user/record", values),
	});


	const [form] = Form.useForm();
	const codeRelationSet = new Set();
	const [selectedCodes, setSelectedCodes] = useState([]); // 선택된 코드 상태 저장

	const handleReset = () => {
		form.resetFields();
	};

	const handleSubmit = async (event) => {
		const values = await form.validateFields();
		console.log("Success:", values);

		await orderInfoCreate(values);
		message.success('수주 등록이 완료되었습니다!');
	}

	return (
		<Layout>
			<div className="contents-top">
				<Flex align="center" justify="space-between" className="title-area">
					<Title level={2} className="title-page">
						영업 관리
					</Title>
				</Flex>

				<Tabs defaultActiveKey="2" items={TabItems} onChange={onTabChange} />

				<div className="top-btn-area">
					{/* 신규 수주 등록시 */}
					<Flex align="center" justify="space-between">
						<Tag className="CurrentStatus001">발주기입</Tag>

						<Flex align="center" gap={8}>
							<Flex className="btn-space-area">
								<Button type="text" onClick={handleReset} className="btn-all-reset">
									전체 초기화
								</Button>
							</Flex>

							<Flex gap={8}>
								<Button icon={<CloseOutlined />} iconPosition={position}>
									취소
								</Button>
								<Button
									type="primary"
									icon={<EditFilled />}
									iconPosition={position}
									onClick={handleSubmit}
								>
									등록
								</Button>
							</Flex>
						</Flex>
					</Flex>
					{/* //신규 수주 등록시 */}
				</div>
			</div>

			<Flex gap={32}>
				<div className="anchor-contents">
					<div
						style={{ paddingTop: contentHeight }}
						className="contents-scroll"
					>
						{inputBoxList.map((item, index) => InputBoxRow(form, codeRelationSet, selectedCodes, setSelectedCodes, item, index))}
					</div>
				</div>
				<div className="anchor-area" style={{ top: contentHeight }}>
					<Anchor
						affix={false}
						onClick={handleAnchorClick}
						items={[
							{
								key: "basic",
								href: "#basic",
								title: "기본정보",
							},
							{
								key: "customer",
								href: "#customer",
								title: "고객정보",
							},
							{
								key: "product",
								href: "#product",
								title: "제품정보",
							},
						]}
					/>
				</div>
			</Flex>
		</Layout>
	);
};

export default OrderInfoCreateNewFinal;
