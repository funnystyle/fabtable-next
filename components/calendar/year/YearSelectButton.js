// pages/year.js
import React from "react";
import { Button, Flex, } from "antd";
import "dayjs/locale/ko";
import dayjs from "dayjs";

const YearSelectButton = ({ setYear }) => {

	return (
		<Flex gap="small" className="btn-spacing-area">
			<Button variant="outlined" onClick={() => setYear(dayjs().year())}>올해</Button>
			<Button variant="outlined" onClick={() => setYear(dayjs().year() - 1)}>작년</Button>
			<Button variant="outlined" onClick={() => setYear(dayjs().year() + 1)}>내년</Button>
		</Flex>
	);
};

export default YearSelectButton;
