// pages/year.js
import React from "react";
import { Button, Flex, Form, } from "antd";
import "dayjs/locale/ko";
import SearchModalHead from "@components/calendar/year/searchModal/SearchModalHead";
import SearchModalNormal from "@components/calendar/year/searchModal/normal/SearchModalNormal";
import SearchModalNumber from "@components/calendar/year/searchModal/number/SearchModalNumber";
import SearchModalDate from "@components/calendar/year/searchModal/date/SearchModalDate";

const SearchModal = ({ closeModal, searchLocation }) => {

	const [form] = Form.useForm();

	const handleSubmit = () => {
		console.log(form.getFieldsValue());
	}

	return (
		<>
			<SearchModalHead form={form} />

			<div className="layer-scroll">
				<SearchModalNormal form={form} title={"일반"} order={1} searchLocation={searchLocation} searchDiv={"NORMAL"} />
				<SearchModalNumber form={form} title={"숫자/수치"} order={2} searchLocation={searchLocation} searchDiv={"NUMBER"} />
				<SearchModalDate form={form} title={"연도"} order={3} searchLocation={searchLocation} searchDiv={"DATE"} />
				<SearchModalNormal form={form} title={"작업자"} order={4} searchLocation={searchLocation} searchDiv={"WORKER"} />

				<Flex
					gap={8}
					align="center"
					justify="center"
					className="layer-btn-area"
				>
					<Button onClick={closeModal}>닫기</Button>
					<Button type="primary"
						onClick={handleSubmit}
					>검색</Button>
				</Flex>
			</div>
		</>
	);
};


export default SearchModal;
