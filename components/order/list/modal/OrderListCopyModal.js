// pages/order/create/index.js
import React from "react";
import { message, Modal, } from "antd";
import ModalTitle from "@components/modal/ModalTitle";
import ModalDraggable from "@components/drag/ModalDraggable";
import { useMutation } from "@tanstack/react-query";
import { postAxios } from "@api/apiClient";
import OrderListCopyModalContent from "@components/order/list/modal/OrderListCopyModalContent";
import useTableSelectKeysOrderListStore from "@store/useTableSelectKeysOrderListStore";
import useOrderListLoadingStore from "@store/useOrderListLoadingStore";

const OrderListCopyModal = ({ form, openModal, setOpenModal }) => {

	const { mutate: orderInfoCopy } = useMutation({
		mutationKey: "orderInfoCopy",
		mutationFn: (values) => postAxios("/user/record/copy", values),
	});

	const { selectedRowKeys } = useTableSelectKeysOrderListStore();

	const { setLoading, setProgress } = useOrderListLoadingStore();

	const handleSubmit = async (event) => {
		if (selectedRowKeys.length === 0) {
			message.warning("복제할 행을 선택해주세요.");
			return;
		}

		setLoading(true);
		setProgress(0);
		const values = await form.validateFields();
		values["ids"] = selectedRowKeys;

		await orderInfoCopy(values);
		setOpenModal(false);
	}

	return (
		<>
			{/* ModalComponent 추가 - "수주 복제하기" 클릭 시 열림 */}
			<div style={{ display: openModal ? "block" : "none" }}>
				<Modal
					centered
					title={<ModalTitle title="수주 복제하기" />}
					open={openModal}
					onCancel={() => setOpenModal(false)}
					onOk={handleSubmit}
					okText="복제"
					cancelText="취소"
					width={640}
					modalRender={(modal) => (<ModalDraggable modal={modal} />)}
				>
					<OrderListCopyModalContent form={form} selectKeysLength={selectedRowKeys.length} />
				</Modal>
			</div>
		</>
	);
};

export default OrderListCopyModal;
