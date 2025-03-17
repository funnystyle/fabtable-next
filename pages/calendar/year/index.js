// pages/year.js
import React, { useEffect, useState } from "react";
import { Flex, Layout, Table, Typography, } from "antd";
import "dayjs/locale/ko";
import { YearChart } from "@components/calendar/year/YearChart";
import YearHeader from "@components/calendar/year/YearHeader";
import { yearTableColumns } from "@components/calendar/year/data/yearTableColumns";
import { useQuery } from "@tanstack/react-query";
import { getAxios } from "@api/apiClient";

const { Title: PageTitle } = Typography;

const YearComponent = ({ contentHeight }) => {

	const today = new Date();
	const [year, setYear] = useState(today.getFullYear());
	const [month, setMonth] = useState(today.getMonth() + 1);

	const [list, setList] = useState([]);

	const [queryKey, setQueryKey] = useState(["calendar-year", year, Math.random()]);
	const { data:calendarYearResponse, isSuccess} = useQuery({
		queryKey,
		queryFn: () => getAxios("/user/calendar/year", {year}),
	});

	const handleReload = () => {
		setQueryKey(["calendar-year", year, Math.random()]);
	}

	useEffect(() => {
		if (isSuccess && calendarYearResponse?.data?.list?.length > 0) {
			// 리스트에 index +1 로 key를 넣는다
			setList(calendarYearResponse.data.list.map((item, index) => { return {key: index+1, ...item} }));


		}
	}, [isSuccess]);

	useEffect(() => {
		handleReload();
	}, [year]);

	return (
		<Layout>
			<Flex
				gap="large"
				align="start"
				justify="space-between"
				className="contents-flex"
			>
				<div className="contents-left">
					<div className="contents-top">
						<PageTitle level={2} className="title-page">
							연간 종합 일정
						</PageTitle>

						<YearChart list={list}/>

						<YearHeader setYear={setYear} month={month} setMonth={setMonth} />
					</div>
				</div>
			</Flex>

			<Flex
				gap="large"
				align="start"
				justify="center"
				className="contents-flex"
				// style={{ width: "100%" }}
			>
				<Table
					columns={yearTableColumns}
					dataSource={list.slice(0, list.length - 5)} // 마지막 5개 데이터를 제외한 데이터만 테이블로 사용
					bordered
					size="small"
					// scroll={{ x: "max-content" }}
					pagination={false}
					style={{ width: "100%" }}
					expandable={{
						expandedRowRender: (record) => (
							// record.key === (data.length).toString() ? (
							<Table
								columns={yearTableColumns} // 확장 테이블의 컬럼을 따로 지정
								dataSource={list.slice(list.length - 5, list.length)} // 마지막 5개 데이터만 테이블로 사용
								pagination={false}
								bordered
								size="small"
								// style={{ width: "0%" }} // 🔹 테이블 폭 줄이기 (부모와 동일한 폭 유지)
							/>
						),
						// ) : null,
						rowExpandable: (record) => record.key === list.length - 5
					}}
				/>
			</Flex>
		</Layout>
	);
};

export default YearComponent;
