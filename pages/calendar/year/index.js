// pages/year.js
import React, { useEffect, useState } from "react";
import { Flex, Layout, Typography, } from "antd";
import "dayjs/locale/ko";
import { YearChart } from "@components/calendar/year/YearChart";
import YearHeader from "@components/calendar/year/YearHeader";
import {useMutation, useQuery} from "@tanstack/react-query";
import {getAxios, postAxios} from "@api/apiClient";
import { YearTable } from "@components/calendar/year/YearTable";

const { Title: PageTitle } = Typography;

const YearComponent = ({ contentHeight }) => {

	// year
	const today = new Date();
	const [year, setYear] = useState([today.getFullYear(), today.getFullYear()]);
	const [list, setList] = useState([]);

	const { mutate: getYear } = useMutation({
		mutationKey: "getYear",
		mutationFn: (values) => postAxios("/user/calendar/year", values),
		onSuccess: (response) => {
			handleListUpdate(response.data.list);
		}
	});

	const handleListUpdate = (list) => {
		setList(list.map((item, index) => { return {key: index+1, ...item} }));
	}

	const handleReload = () => {
		getYear({year: year});
	}

	useEffect(() => {
		handleReload();
	}, [year]);

	return (
		<Layout>
			<Flex gap="large" align="start" justify="space-between" className="contents-flex">
				<div className="contents-left">
					<div className="contents-top">
						<PageTitle level={2} className="title-page">
							연간 종합 일정
						</PageTitle>

						<YearChart list={list}/>

						<YearHeader year={year} setYear={setYear} handleListUpdate={handleListUpdate} />
					</div>
				</div>
			</Flex>

			<Flex gap="large" align="start" justify="center" className="contents-flex">
				<YearTable list={list} />
			</Flex>
		</Layout>
	);
};

export default YearComponent;
