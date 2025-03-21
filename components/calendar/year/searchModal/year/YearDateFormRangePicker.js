// pages/year.js
import React, {useEffect} from "react";
import {DatePicker,} from "antd";
import "dayjs/locale/ko";
import dayjs from "dayjs";

const YearDateFormRangePicker = ({year, setYear, style}) => {

	const { RangePicker } = DatePicker;

	const onChange = (date, dateString) => {
		console.log(date, dateString);
		setYear(dateString);
	}

	const disabled3Years = (current, { from, type }) => {
		if (from) {
			const minYear = from.add(-2, "years");
			const maxYear = from.add(2, "years");

			switch (type) {
				case "year":
					return (
						current.year() < minYear.year() || current.year() > maxYear.year()
					);
			}
		}

		return false;
	};

	useEffect(() => {
		console.log("year: ", year)
	}, [year]);

	return (
		<RangePicker
			// id={{
			// 	start: "startInput",
			// 	end: "endInput",
			// }}
			picker="year"
			value={year.map((y) => dayjs(`${y}-01-01`))}
			onChange={onChange}
			placeholder={["시작 연도", "종료 연도"]}
			style={style}
			styles={{ input: { textAlign: "center" } }}
			format="YYYY"
			disabledDate={disabled3Years}
		/>
	);
};

export default YearDateFormRangePicker;
