// pages/samples/orderInfo/OrderCreateNewFinal.js
import React, {useEffect, useState} from "react";
import {Anchor, Flex, Form, Layout,} from "antd";
import {useQuery} from "@tanstack/react-query";
import {getAxios} from "@api/apiClient";
import {handleInputBoxRow} from "@components/inputForm/handleInputBoxRow";
import {handleCsAsInputBox} from "@components/inputForm/cs/handleCsAsInputBox";
import CsFollowUplInputBox from "@components/inputForm/cs/CsFollowUplInputBox";
import CsRecordInputBoxes from "@components/cs/create/CsRecordInputBoxes";
import CsAsDetailInputBox from "@components/inputForm/cs/CsAsDetailInputBox";
import SearchModal from "@components/searchModal/SearchModal";
import CsCreateHeader from "@components/cs/create/CsCreateHeader";
import useCsCreateConstantStore from "@store/useCsCreateConstantStore";
import CsCreateTab from "@components/cs/create/CsCreateTab";
import CsCreateTitle from "@components/cs/create/CsCreateTitle";

const CsCreate = ({ contentHeight }) => {

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

	const [asKeys, setAsKeys] = useState([0]);
	const [asCheckedKeySet, setAsCheckedKeySet] = useState(new Set());

	const { setAsKeys:setConstantAsKeys } = useCsCreateConstantStore();


	useEffect(() => {
		setConstantAsKeys(asKeys);
	}, [asKeys]);

	return (
		<Layout>
			<div className="contents-top">
				<CsCreateTitle title="C/S 관리" />

				<CsCreateTab activeKey={2} />

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
						
						<CsAsDetailInputBox form={form} />

						<CsFollowUplInputBox form={form} />
					</div>
				</div>
				<div className="anchor-area" style={{ top: contentHeight }}>
					<Anchor
						affix={false}
						onClick={handleAnchorClick}
						items={[
							{
								key: "cs1",
								href: "#cs1",
								title: "접수 내용",
							},
							{
								key: "cs2",
								href: "#cs2",
								title: "제품 내역",
							},
							{
								key: "cs3",
								href: "#cs3",
								title: "출장업무 내용",
							},
							{
								key: "cs4",
								href: "#cs4",
								title: "출장 내역",
							},
							{
								key: "cs5",
								href: "#cs5",
								title: "후속 조치",
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
