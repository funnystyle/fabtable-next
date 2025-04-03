// pages/order.js
import React, { useEffect, useState } from "react";
import { Dropdown, } from "antd";
import TableOnRowSelect2 from "@components/TableOnRowSelect2";
import { orderListRightItem } from "@components/order/list/data/orderListRightItem";
import OrderListHeaderData from "@components/order/list/OrderListHeaderData";
import { transformTagData } from "@components/order/table/transformTagData";
import PagingArea from "@components/list/PagingArea";
import useMenuTabStore from "@store/useMenuTabStore";
import useRecordDataStore from "@store/useRecordDataStore";
import { useRouter } from "next/router";
import { useGetCodeList } from "@components/api/useGetCodeList";
import ListPopover from "@components/list/Popover";
import useOrderListSearchRecordModalStore from "@store/useOrderListSearchRecordModalStore";

const OrderListTable = ({ isPending }) => {

	const [headerList, setHeaderList] = useState([]);

	const { page, size, total, totalPages, data, setPage, setSize, setOpenCopyModal, setOpenEditModal } = useOrderListSearchRecordModalStore();
	const { tooltipList:soList } = useGetCodeList("특주사양");
	const { tooltipList:cuList } = useGetCodeList("고객사");
	const { tooltipList:buList } = useGetCodeList("납품처");

	const handleContextMenuClick = (e) => {
		if (parseInt(e.key) === 1) {
			setOpenCopyModal(true);
		} else if (parseInt(e.key) === 2) {
			setOpenEditModal(true);
		}
	};

	const { moveUrl } = useMenuTabStore();
	const { setRecord, setTagInfoList, setIsCopy } = useRecordDataStore();
	const router = useRouter();

	const handleDoubleClick = (record) => {
		// record.nowState = record.nowState.props.children
		setRecord(record);
		setIsCopy(false);
		moveUrl("/order/create");
		router.push("/order/create");
	}

	const handleSettingKeyToData = (data) => {
		return (transformTagData(data) || []).map((item, index) => {
			item.key = item.id;
			return item;
		});
	}

	const handleSettingTooltip = (value, tooltipList) => {
		// tooltipList 는 codeName, tooltip으로 이루어진 오브젝트 배열
		// value와 동일한 codeName을 가진 tooltipList의 index를 찾고 해당 tooltipList의 tooltip을 반환
		const tooltip = tooltipList.find(item => item.codeName === value);

		if (!tooltip) {
			return value;
		}

		return <ListPopover codeName={tooltip.codeName} tooltip={tooltip.tooltip} />;
	}

	useEffect(() => {
		setTagInfoList(data?.tagInfoList || []);
	}, [data]);

	return (
		<>
			<PagingArea page={page} size={size} total={total} totalPages={totalPages} setPage={setPage} setSize={setSize} />

			{/* 태그 없음, 헤더 관련 정리 event */}
			<OrderListHeaderData setHeaderList={setHeaderList} headerDiv={"SALES"} />
			<Dropdown
				menu={{
					items: orderListRightItem,
					onClick: handleContextMenuClick,

				}}
				trigger={["contextMenu"]}
			>
				<div>
					{/* 테이블 */}
					<TableOnRowSelect2 header={headerList} serverData={handleSettingKeyToData(data).map((item => {
						item.specialOrderNumber = item.specialOrderNumber ? handleSettingTooltip(item.specialOrderNumber, soList) : "";
						item.customer = item.customer ? handleSettingTooltip(item.customer, cuList) : "";
						item.buyer = item.buyer ? handleSettingTooltip(item.buyer, buList) : "";

						return item;
					}))

					} size={size} setSize={setSize} scrollY={"calc(100vh - 260px)"} onRowDoubleClick={handleDoubleClick}
					isPending={isPending}
					/>
				</div>
			</Dropdown>
		</>
	);
};

export default OrderListTable;
