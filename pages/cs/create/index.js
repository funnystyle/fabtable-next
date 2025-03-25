// pages/samples/orderInfo/OrderCreateNewFinal.js
import React, { useEffect, useState } from "react";
import { Anchor, Button, Flex, Form, Layout, Tabs, Tag, Typography, } from "antd";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getAxios } from "@api/apiClient";
import { handleInputBoxRow } from "@components/inputForm/handleInputBoxRow";
import { CloseOutlined, EditFilled } from "@ant-design/icons";
import { handleCsAsInputBox } from "@components/inputForm/cs/handleCsAsInputBox";
import CsFollowUplInputBox from "@components/inputForm/cs/CsFollowUplInputBox";
import CsRecordInputBoxes from "@components/cs/create/CsRecordInputBoxes";
import CsAsDetailInputBox from "@components/inputForm/cs/CsAsDetailInputBox";
import SearchModal from "@components/searchModal/SearchModal";
import CsCreateHeader from "@components/cs/create/CsCreateHeader";

const { Title } = Typography;


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

const CsCreate = ({ contentHeight }) => {
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
		queryFn: () => getAxios("/user/input-box", {type:"csCreate"}),
	});
	useEffect(() => {
		if (isSuccess) {
			setInputBoxList(inputBoxResponse.data.list);
		}
	}, [isSuccess]);

	const [form] = Form.useForm();
	const codeRelationSet = new Set();
	const [selectedCodes, setSelectedCodes] = useState([]); // 선택된 코드 상태 저장

	const [recordKeys, setRecordKeys] = useState([1, 2]);
	const [checkedKeySet, setCheckedKeySet] = useState(new Set());

	const [asKeys, setAsKeys] = useState([0]);
	const [asCheckedKeySet, setAsCheckedKeySet] = useState(new Set());

	const [isAsDetailCommon, setIsAsDetailCommon] = useState(true);
	const [isFollowUpCommon, setIsFollowUpCommon] = useState(true);

	return (
		<Layout>
			<div className="contents-top">
				<Flex align="center" justify="space-between" className="title-area">
					<Title level={2} className="title-page">
						영업 관리
					</Title>
				</Flex>

				<Tabs defaultActiveKey="2" items={TabItems} onChange={onTabChange} />

				<CsCreateHeader form={form} />
			</div>

			<Flex gap={32}>
				<div className="anchor-contents">
					<div
						style={{ paddingTop: contentHeight }}
						className="contents-scroll"
					>
						{inputBoxList.map((item, index) => handleInputBoxRow(form, codeRelationSet, selectedCodes, setSelectedCodes, item, index))}

						<CsRecordInputBoxes form={form} codeRelationSet={codeRelationSet} />

						{handleCsAsInputBox(form, asKeys, setAsKeys, asCheckedKeySet, setAsCheckedKeySet)}
						
						<CsAsDetailInputBox form={form} checkedKeySet={checkedKeySet} setCheckedKeySet={setCheckedKeySet} isCommon={isAsDetailCommon} setIsCommon={setIsAsDetailCommon} />

						<CsFollowUplInputBox form={form} checkedKeySet={checkedKeySet} setCheckedKeySet={setCheckedKeySet} isCommon={isFollowUpCommon} setIsCommon={setIsFollowUpCommon} />
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

			<SearchModal searchLocation={"order"} searchType={"OPEN"}/>
		</Layout>
	);
};

export default CsCreate;
