// pages/order.js
import React, { useEffect, useState } from "react";
import { Dropdown, } from "antd";
import TableOnRowSelect2 from "@components/TableOnRowSelect2";
import { orderListRightItem } from "@components/order/list/data/orderListRightItem";
import { transformTagData } from "@components/order/table/transformTagData";
import { useGetCsList } from "@components/api/useGetCsList";
import useCsSearchModalStore from "@store/useCsSearchModalStore";
import CsListHeaderData from "@components/cs/list/CsListHeaderData";
import PagingArea from "@components/list/PagingArea";
import { csListRightItem } from "./data/csListRightItem";

const CsListTable = ({ contentHeight }) => {

	const [headerList, setHeaderList] = useState([]);

	const { page, size, total, totalPages, data, setPage, setSize, setOpenCopyModal, setOpenEditModal } = useCsSearchModalStore();

	const handleContextMenuClick = (e) => {
		alert("click", e);
		if (parseInt(e.key) === 1) {
			setOpenCopyModal(true);
		} else if (parseInt(e.key) === 2) {
			setOpenEditModal(true);
		}
	};

	const { handleReload } = useGetCsList();

	useEffect(() => {
		handleReload();
	}, []);


	return (
		<>
			<PagingArea page={page} size={size} total={total} totalPages={totalPages} setPage={setPage} setSize={setSize} />
			{/* 태그 없음, 헤더 관련 정리 event */}
			<CsListHeaderData setHeaderList={setHeaderList} headerDiv={"CS"} />
			<Dropdown
				menu={{
					items: csListRightItem,
					onClick: handleContextMenuClick,

				}}
				trigger={["contextMenu"]}
			>
				<div>
					{/* 테이블 */}
					<TableOnRowSelect2 header={headerList} serverData={transformTagData(data)} size={size} setSize={setSize} scrollY={"calc(100vh - 330px)"}/>
				</div>
			</Dropdown>
		</>
	);
};

export default CsListTable;
