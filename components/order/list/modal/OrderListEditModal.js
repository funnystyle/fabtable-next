// pages/order/create/index.js
import React from "react";
import { message, Modal, } from "antd";
import ModalTitle from "@components/modal/ModalTitle";
import ModalDraggable from "@components/drag/ModalDraggable";
import { useMutation } from "@tanstack/react-query";
import { putAxios } from "@api/apiClient";
import { ExclamationCircleFilled } from "@ant-design/icons";
import OrderListEditModalContent from "@components/order/list/modal/OrderListEditModalContent";
import useTableSelectKeysOrderListStore from "@store/useTableSelectKeysOrderListStore";

const OrderListEditModal = ({ form, openModal, setOpenModal }) => {

	const [modal, contextHolder] = Modal.useModal();

	const { mutate: nowStateChange } = useMutation({
		mutationKey: "nowStateChange",
		mutationFn: (values) => putAxios("/user/record", values),
	});

	const { selectedRowKeys } = useTableSelectKeysOrderListStore();

	const handleEditSubmit = async (e) => {
		if (selectedRowKeys.length === 0) {
			message.warning("수정할 행을 선택해주세요.");
			return;
		}

		const values = await form.validateFields();
		values["ids"] = selectedRowKeys;

		await nowStateChange(values);
		setOpenModal(false);
	}

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
					setOpenModal(false);
				}, 100);
			},
			onCancel() {
				console.log("수정 취소");
			},
			centered: true,
		});
	};

	return (
		<>
			{/* ModalComponent 추가 - "수주 복제하기" 클릭 시 열림 */}
			<div style={{ display: openModal ? "block" : "none" }}>
				<Modal
					centered
					title={<ModalTitle title="수주 정보 일괄수정" />}
					open={openModal}
					onCancel={() => setOpenModal(false)}
					onOk={() => {
						setTimeout(() => {
							handleConfirmEdit();
						}, 300);
					}}
					okText="수정"
					cancelText="취소"
					width={780}
					modalRender={(modal) => (<ModalDraggable modal={modal} />)}
				>
					<OrderListEditModalContent form={form} selectKeysLength={selectedRowKeys.length} />
				</Modal>
			</div>

			{contextHolder}
		</>
	);
};

export default OrderListEditModal;
