// pages/order.js
import React, { useEffect, useState } from "react";
import TableOnRowSelect2 from "@components/TableOnRowSelect2";
import { transformTagData } from "@components/order/table/transformTagData";
import { CheckOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Flex, Form, Modal } from "antd";
import { useGetCsList } from "@components/api/useGetCsList";
import useCsDataStore from "@store/useCsDataStore";
import CsListHeaderData from "@components/cs/list/CsListHeaderData";
import PagingArea from "@components/list/PagingArea";
import { useGetRecordsJoinCS } from "@components/api/useGetRecordsJoinCS";
import useMenuTabStore from "@store/useMenuTabStore";
import { useRouter } from "next/router";
import useTableSelectKeysStore from "@store/useTableSelectKeysStore";

const CsHistoryModalTable = ({ form, modalStore }) => {

	const { page, size, total, totalPages, data, setPage, setSize,setOpenSearchModal, reload } = modalStore();
	const { handleReload, isPending } = useGetRecordsJoinCS(modalStore, true, false);

	const [headerList, setHeaderList] = useState([]);

	const [modal, contextHolder] = Modal.useModal();
	const { moveUrl } = useMenuTabStore();
	const { setCs, setIsCopy, setTagInfoList } = useCsDataStore();
	const router = useRouter();
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
				setIsCopy(false);
				setOpenSearchModal(false);
				moveUrl("/cs/create");
				router.push("/cs/create");
			},
			onCancel() {
				console.log("수정 취소");
			},
			centered: true,
		});
	};

	const onRowClick = (record) => {
		handleConfirmEdit(record);
	}

	useEffect(() => {
		setTagInfoList(data?.tagInfoList || []);
	}, [data]);

	const {datas} = useTableSelectKeysStore();

	useEffect(() => {
		if (datas.length > 0) {
			const data = datas[0];
			const oldSerialNumber = data.oldSerialNumber;
			const serialNumber = data.serialNumber;
			const csNumber = data.csNumber;
			form.setFieldsValue({ oldSerialNumber, serialNumber, csNumber });

			setTimeout(() => {
				// reload();
			}, 50);
		}
	}, [datas]);

	const values = Form.useWatch([], form); // 폼 전체 값을 watch

	useEffect(() => {
		reload();
	}, [values]);

	return (
		<>
			<PagingArea page={page} size={size} total={total} totalPages={totalPages} setPage={setPage} setSize={setSize} />

			{/* 태그 없음, 헤더 관련 정리 event */}
			<CsListHeaderData setHeaderList={setHeaderList} headerDiv={"CS_LOAD"}/>
			<div className="contents-scroll">
				{/* 테이블 */}
				<TableOnRowSelect2 header={headerList} serverData={transformTagData(data).map((item) => {
					item.etc_cs_load=(
						<>
							<Flex gap={4}>
								<Button size="small">C/S정보</Button>
								<Button size="small">수주정보</Button>
								<Button size="small" icon={<CheckOutlined />} iconPosition="start">
									선택
								</Button>
							</Flex>
						</>
					);
					return item;
				})
				} size={size} setSize={setSize} onRowClick={onRowClick} rowSelect={false}
				isPending={isPending} isFirstLoad={false}
				/>
			</div>

			{contextHolder}
		</>
	);
};

export default CsHistoryModalTable;
