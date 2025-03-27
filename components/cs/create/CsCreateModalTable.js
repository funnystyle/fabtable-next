// pages/order.js
import React, { useEffect, useState } from "react";
import TableOnRowSelect2 from "@components/TableOnRowSelect2";
import { transformTagData } from "@components/order/table/transformTagData";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal } from "antd";
import { useGetCsList } from "@components/api/useGetCsList";
import useCsSearchModalStore from "@store/useCsSearchModalStore";
import useCsDataStore from "@store/useCsDataStore";
import CsListHeaderData from "@components/cs/list/CsListHeaderData";

const CsCreateModalTable = ({ contentHeight }) => {

	const [headerList, setHeaderList] = useState([]);

	const { size, data, setSize, setOpenSearchModal } = useCsSearchModalStore();

	const { handleReload } = useGetCsList();

	useEffect(() => {
		handleReload();
	}, []);

	const [modal, contextHolder] = Modal.useModal();
	const { setCs } = useCsDataStore();
	const handleConfirmEdit = (record) => {
		modal.confirm({
			title: "CS 정보 불러오기",
			icon: <ExclamationCircleFilled style={{ color: "#FAAD14" }} />,
			content:
				"해당 정보를 불러오시겠습니까? ",
			okText: "확인",
			cancelText: "취소",
			onOk() {
				// record.nowState = record.nowState.props.children
				setCs(record);
				setOpenSearchModal(false);
			},
			onCancel() {
				console.log("수정 취소");
			},
		});
	};

	const onRowClick = (record) => {
		handleConfirmEdit(record);
	}

	return (
		<>
			{/* 태그 없음, 헤더 관련 정리 event */}
			<CsListHeaderData setHeaderList={setHeaderList} headerDiv={"CS"}/>
			<div style={{ marginTop: contentHeight }} className="contents-scroll">
				{/* 테이블 */}
				<TableOnRowSelect2 header={headerList} serverData={transformTagData(data)} size={size} setSize={setSize} onRowClick={onRowClick} rowSelect={false}/>
			</div>

			{contextHolder}
		</>
	);
};

export default CsCreateModalTable;
