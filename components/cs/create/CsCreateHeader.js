// pages/order/create/index.js
import React from "react";
import {Button, Flex, message, Tag,} from "antd";
import {useMutation} from "@tanstack/react-query";
import {postAxios} from "@api/apiClient";
import {CloseOutlined, EditFilled} from "@ant-design/icons";
import useCsCreateConstantStore from "@store/useCsCreateConstantStore";
import useCsDataStore from "@store/useCsDataStore";
import useMenuTabStore from "@store/useMenuTabStore";
import {transformTagDataSingle} from "@components/order/table/transformTagData";

const CsCreateHeader = ({ form }) => {

	const { isAsDetailCommon, isFollowUpCommon, files, asKeys } = useCsCreateConstantStore();
	const { setCs } = useCsDataStore();
	const { moveUrl } = useMenuTabStore();

	const { mutate: csCreate } = useMutation({
		mutationKey: "csCreate",
		mutationFn: (values) => postAxios("/user/cs", values, true),
		onSuccess: (response, values) => {
			values.id= response?.data?.id;
			values.csNumber = response?.data?.csNumber;
			values.csState = transformTagDataSingle(response?.data?.tagInfoList, response?.data?.csState);

			setCs(values)
		}
	});

	const handleReset = () => {
		form.resetFields();
	};

	const convertBlobUrlToFile = async (blobUrl, fileName, mimeType) => {
		const res = await fetch(blobUrl);
		const blob = await res.blob(); // Blob 객체로 변환
		return new File([blob], fileName, { type: mimeType }); // File 객체로 반환
	};

	const handleSubmit = async (event) => {
		const values = await form.validateFields();
		values["isAsDetailCommon"] = isAsDetailCommon;
		values["isFollowUpCommon"] = isFollowUpCommon;
		values["asWorkLength"] = asKeys.length;

		const formData = new FormData();
		formData.append("data", new Blob([JSON.stringify(values)], { type: "application/json" }));

		if (files) {
			let fileLength = {};
			for (const [index, fileArray] of Object.entries(files)) {
				for (const file of fileArray) {
					const fileName = file.name;
					const mimeType = file.type;

					// Blob URL을 실제 File 객체로 변환
					const actualFile = await convertBlobUrlToFile(file.url, fileName, mimeType);

					console.log("actualFile: ", actualFile);
					formData.append("files", actualFile);
				}
				// index별로 files.length를 fileMeta로 formData에 추가
				fileLength[index] = fileArray.length;
			}
			formData.append(`fileMeta`, new Blob([JSON.stringify({fileLength:fileLength})], { type: "application/json" }));
		}

		await csCreate(formData);
		message.success('CS 등록이 완료되었습니다!');
		// moveUrl("/cs/list")
	}

	return (
		<div className="top-btn-area">
			{/* 신규 수주 등록시 */}
			<Flex align="center" justify="space-between">
				<Flex align="center">
					<Tag className="tag-receipt">접수</Tag>

					<p className="cs-num">
						C/S No. <span>--------</span>
					</p>
				</Flex>

				<Flex align="center" gap={8}>
					<Flex className="btn-space-area">
						<Button type="text" onClick={handleReset} className="btn-all-reset">
							전체 초기화
						</Button>
					</Flex>

					<Flex gap={8}>
						<Button icon={<CloseOutlined />} iconPosition={"end"}>
							취소
						</Button>
						<Button
							type="primary"
							icon={<EditFilled />}
							iconPosition={"end"}
							onClick={handleSubmit}
						>
							등록
						</Button>
					</Flex>
				</Flex>
			</Flex>
			{/* //신규 수주 등록시 */}
		</div>
	);
};

export default CsCreateHeader;
