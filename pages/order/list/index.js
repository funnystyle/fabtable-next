// pages/order.js
import React, { useEffect, useRef, useState } from "react";
import { Dropdown, Form, Layout, message, Modal, Space, Tag, } from "antd";
import { ExclamationCircleFilled, } from "@ant-design/icons";

import DrawerComponent from "@publish/components/drawer";
import Draggable from "react-draggable";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAxios, postAxios, putAxios } from "@api/apiClient";
import TableOnRowSelect2 from "@components/TableOnRowSelect2";
import { handleCopyModal } from "@components/list/handleCopyModal";
import { handleEditModal } from "@components/list/handleEditModal";
import OrderListTitle from "@components/order/list/OrderListTitle";
import OrderCreateTab from "@components/order/create/OrderCreateTab";
import OrderListSearchTags from "@components/order/list/OrderListSearchTags";
import OrderListButtonArea from "@components/order/list/OrderListButtonArea";
import { orderListRightItem } from "@components/order/list/data/orderListRightItem";
import OrderListHeaderData from "@components/order/list/OrderListHeaderData";

const OrderComponent = ({ contentHeight }) => {

	const [current, setCurrent] = useState(2);
	const [inputValue, setInputValue] = useState("2");
	const totalItems = 50;
	const totalPages = Math.ceil(totalItems / 10);

	// 테이블
	const [sortedInfo, setSortedInfo] = useState({});

	// --------- 드로어 관련
	const [openDrawer, setOpenDrawer] = useState(false); // Drawer 열림 상태
	const [drawerHeader, setDrawerHeader] = useState(null); // Drawer 헤더
	const [drawerContent, setDrawerContent] = useState(null); // Drawer 본문 내용
	const [drawerFooter, setDrawerFooter] = useState(null); // Drawer 푸터 버튼
	const [drawerTitle, setDrawerTitle] = useState(""); // Drawer 제목 상태

	const closeDrawer = () => {
		setOpenDrawer(false);
	};
	// --------- 드로어 관련

	// --------- 모달 관련
	const [openCopyModal, setOpenCopyModal] = useState(false); // Modal 열림 상태
	const [openEditModal, setOpenEditModal] = useState(false);
	const [modalContent, setModalContent] = useState(null); // Modal 내용
	const [modal, contextHolder] = Modal.useModal();

	const [copyForm] = Form.useForm();
	const [editForm] = Form.useForm();

	const [copyModalBoxList, setCopyModalBoxList] = useState([]);

	// 복제 모달 열기
	const showCopyModal = () => {
		setModalContent(handleCopyModal(copyForm, selectedRowKeys.length, copyModalBoxList));

		setOpenCopyModal(true);
	};

	const { mutate: orderInfoCopy } = useMutation({
		mutationKey: "orderInfoCopy",
		mutationFn: (values) => postAxios("/user/record/copy", values),
	});

	const handleSubmit = async (event) => {
		const values = await copyForm.validateFields();
		values["ids"] = selectedRowKeys;

		await orderInfoCopy(values);
		setOpenCopyModal(false);

		setTimeout(() => {
		handleSearch();
		}, 100);
		message.success('복제가 완료되었습니다!');
	}

	const [editModalBoxList, setEditModalBoxList] = useState([]);

	// 일괄수정 모달 열기
	const showEditModal = () => {
		setModalContent(handleEditModal(editForm, selectedRowKeys.length, editModalBoxList));

		setOpenEditModal(true);
	};

	const handleEditSubmit = async (e) => {
		const values = await editForm.validateFields();
		values["ids"] = selectedRowKeys;

		await nowStateChange(values);
		setOpenEditModal(false);

		if (selectedRowKeys.length > 0) {
			setTimeout(() => {
				handleSearch();
			}, 100);
		}
	}
	const handleContextMenuClick = (e) => {
		if (parseInt(e.key) === 1) {
			showCopyModal();
		} else if (parseInt(e.key) === 2) {
			showEditModal();
		}
	};


	// 모달 닫기
	const closeModal = () => {
		setOpenCopyModal(false);
		setOpenEditModal(false);
	};

	const handleConfirmEdit = () => {
		modal.confirm({
			title: "수주 정보 일괄수정",
			icon: <ExclamationCircleFilled style={{ color: "#FAAD14" }} />,
			content:
				"여러 건의 수주 정보를 일괄 수정할까요? 수정 후에는 다시 되돌릴 수 없습니다. ",
			okText: "확인",
			cancelText: "취소",
			onOk() {
				handleEditSubmit();
				setTimeout(() => {
					closeModal();
				}, 100);
			},
			onCancel() {
				console.log("수정 취소");
			},
		});
	};

	const [disabled, setDisabled] = useState(true);
	const [bounds, setBounds] = useState({
		left: 0,
		top: 0,
		bottom: 0,
		right: 0,
	});
	const draggleRef = useRef(null);

	const onStart = (_event, uiData) => {
		const { clientWidth, clientHeight } = window.document.documentElement;
		const targetRect = draggleRef.current?.getBoundingClientRect();
		if (!targetRect) {
			return;
		}
		setBounds({
			left: -targetRect.left + uiData.x,
			right: clientWidth - (targetRect.right - uiData.x),
			top: -targetRect.top + uiData.y,
			bottom: clientHeight - (targetRect.bottom - uiData.y),
		});
	};
	// --------- 모달 관련

	const [selectedRowKeys, setSelectedRowKeys] = useState([]); // 선택된 행
	const [headerList, setHeaderList] = useState([]);

	function transformTagData(data) {
		const tagInfoMap = new Map();

		// tagInfoList에서 모든 태그 코드 매핑 생성
		data.tagInfoList.forEach(tagInfo => {
			tagInfo.codeList.forEach(code => {
				tagInfoMap.set(`${tagInfo.name}_${code.codeName}`, code.className);
			});
		});

		// list 데이터를 변환 (기존 데이터 유지하면서 태그 변환)
		return data.list.map((item) => {
			const updatedItem = { ...item };

			Object.keys(item).forEach(key => {
				const tagKey = `${key}_${item[key]}`;
				if (tagInfoMap.has(tagKey)) {
					updatedItem[key] = <Tag className={tagInfoMap.get(tagKey)}>{item[key]}</Tag>;
				}
			});

			return updatedItem;
		});
	}

	const [statusList, setStatusList] = useState([]);
	const [searchStatusList, setSearchStatusList] = useState([]);
	const [stateStatusList, setStateStatusList] = useState([]);

	const { mutate: nowStateChange } = useMutation({
		mutationKey: "nowStateChange",
		mutationFn: (values) => putAxios("/user/record", values),
	});

	const [searchKeyword, setSearchKeyword] = useState("");
	const [recordList, setRecordList] = useState([]);
	const [size, setSize] = useState(10);
	const [queryKey, setQueryKey] = useState(["record-list", searchKeyword, size, searchStatusList, Math.random()]);
	const { data:recordResponse, isLoading, isSuccess, isError } = useQuery({
		queryKey,
		queryFn: () => getAxios("/user/record", {searchKeyword,
			size,
			statusList: searchStatusList,
		}),
	});
	const handleSearch = () => {
		setQueryKey(["record-list", searchKeyword, size, searchStatusList, Math.random()]);
	}
	useEffect(() => {
		handleSearch();
	}, [searchKeyword, size, searchStatusList]);
	useEffect(() => {
		if (isSuccess) {
			setRecordList(transformTagData(recordResponse.data));
		}
	}, [isSuccess]);



	return (
		<Layout>
			<div className="contents-top">
				<OrderListTitle title="영업 관리" setSearchKeyword={setSearchKeyword} />

				<OrderCreateTab activeKey={1} />

				<Space direction="vertical" size={12} style={{ width: "100%" }}>
					{/*  검색결과 */}
					<OrderListSearchTags />

					{/* 상단 버튼 */}
					<OrderListButtonArea statusList={statusList} setStatusList={setStatusList}
															 searchStatusList={searchStatusList} setSearchStatusList={setSearchStatusList}
															 stateStatusList={stateStatusList} setStateStatusList={setStateStatusList}
															 selectedRowKeys={selectedRowKeys} handleSearch={handleSearch}
															 setCopyModalBoxList={setCopyModalBoxList} showCopyModal={showCopyModal} setEditModalBoxList={setEditModalBoxList} showEditModal={showEditModal}
															 setOpenDrawer={setOpenDrawer} setDrawerHeader={setDrawerHeader}
															 setDrawerContent={setDrawerContent} setDrawerFooter={setDrawerFooter} setDrawerTitle={setDrawerTitle} />
				</Space>
			</div>

			<OrderListHeaderData setHeaderList={setHeaderList} sortedInfo={sortedInfo} />
			<Dropdown
				menu={{
					items: orderListRightItem,
					onClick: handleContextMenuClick,

				}}
				trigger={["contextMenu"]}
			>
				<div style={{ marginTop: contentHeight }} className="contents-scroll">
					{/* 테이블 */}
					<TableOnRowSelect2 header={headerList} serverData={recordList} size={size} setSize={setSize} selectedRowKeys={selectedRowKeys} setSelectedRowKeys={setSelectedRowKeys} />
				</div>
			</Dropdown>

			{/* DrawerComponent 추가 - 상태와 닫기 핸들러 전달 */}
			<div style={{ display: openDrawer ? "block" : "none" }}>
				<DrawerComponent
					open={openDrawer}
					onClose={closeDrawer}
					title={drawerTitle}
					headerContent={drawerHeader} // 동적으로 헤더 변경
					content={drawerContent} // 동적으로 본문 변경
					footer={drawerFooter} // 동적으로 푸터 버튼 변경
					selectedRowKeys={selectedRowKeys}
				/>
			</div>

			{/* ModalComponent 추가 - "수주 복제하기" 클릭 시 열림 */}
			<div style={{ display: openCopyModal ? "block" : "none" }}>
				<Modal
					title={
						<div
							className="modal-title"
							onMouseOver={() => setDisabled(false)}
							onMouseOut={() => setDisabled(true)}
						>
							수주 복제하기
						</div>
					}
					open={openCopyModal}
					onCancel={() => setOpenCopyModal(false)}
					onOk={handleSubmit}
					okText="복제"
					cancelText="취소"
					width={640}
					modalRender={(modal) => (
						<Draggable
							disabled={disabled}
							bounds={bounds}
							nodeRef={draggleRef}
							onStart={(event, uiData) => onStart(event, uiData)}
						>
							<div ref={draggleRef}>{modal}</div>
						</Draggable>
					)}
				>
					{modalContent}
				</Modal>
			</div>

			{/* ModalComponent 추가 - "수주 일괄수정하기" 클릭 시 열림 */}
			<div style={{ display: openEditModal ? "block" : "none" }}>
				<Modal
					title={
						<div
							className="modal-title"
							onMouseOver={() => setDisabled(false)}
							onMouseOut={() => setDisabled(true)}
						>
							수주 정보 일괄수정
						</div>
					}
					open={openEditModal}
					onCancel={() => setOpenEditModal(false)}
					onOk={() => {
						setTimeout(() => {
							handleConfirmEdit();
						}, 300);
					}}
					okText="수정"
					cancelText="취소"
					width={780}
					modalRender={(modal) => (
						<Draggable
							disabled={disabled}
							bounds={bounds}
							nodeRef={draggleRef}
							onStart={(event, uiData) => xonxStart(event, uiData)}
						>
							<div ref={draggleRef}>{modal}</div>
						</Draggable>
					)}
				>
					{modalContent}
				</Modal>
			</div>

			{/* contextHolder를 포함해야 modal.confirm이 정상 작동 */}
			{contextHolder}
		</Layout>
	);
};

export default OrderComponent;
