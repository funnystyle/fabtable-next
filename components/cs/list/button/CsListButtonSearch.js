// pages/order/create/index.js
import React, {useEffect} from "react";
import {Button,} from "antd";
import {FilterOutlined} from "@ant-design/icons";
import useCsSearchModalStore from "@store/useCsSearchModalStore";
import CsSearchModal from "@components/searchModal/CsSearchModal";

const CsListButtonSearch = ({ isActive }) => {

	const { setOpenSearchModal, list } = useCsSearchModalStore();

	useEffect(() => {
		setOpenSearchModal(false);
	}, [list]);

	return (
		<>
			<Button
				icon={<FilterOutlined />}
				iconPosition={"end"}
				size="large"
				onClick={() => setOpenSearchModal(true)}
			>
				조건 검색
			</Button>

			<CsSearchModal searchLocation={"cs"} searchType={"LIST"} isActive={isActive}/>
		</>
	);
};

export default CsListButtonSearch;
