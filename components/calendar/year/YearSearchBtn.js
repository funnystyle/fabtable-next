// pages/year.js
import React, {useState} from "react";
import {Button, Flex,} from "antd";
import {SearchOutlined,} from "@ant-design/icons";
import "dayjs/locale/ko";
import YearSearchModal from "@components/calendar/year/YearSearchModal";

const YearSearchBtn = ({ year, setYear, setSearchData }) => {

	const [openSearchModal, setOpenSearchModal] = useState(false); // Modal 열림 상태

	const showSearchModal = () => {
		setOpenSearchModal(true);
	}

	return (
		<>
			<Flex gap="small">
				<Button variant="outlined" icon={<SearchOutlined />}
					onClick={showSearchModal}
				>
					조건 검색
				</Button>
			</Flex>

			{/* ModalComponent 추가 - "조건 검색" 클릭 시 열림 */}
			<YearSearchModal
				year={year}
				setYear={setYear}
				setSearchData={setSearchData}
				openSearchModal={openSearchModal}
				setOpenSearchModal={setOpenSearchModal}
			/>
		</>
	);
};

export default YearSearchBtn;
