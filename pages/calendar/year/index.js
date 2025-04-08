// pages/year.js
import React, { useEffect, useState } from "react";
import { Flex, Layout, Typography, } from "antd";
import "dayjs/locale/ko";
import { YearChart } from "@components/calendar/year/YearChart";
import YearHeader from "@components/calendar/year/YearHeader";
import {useMutation, useQuery} from "@tanstack/react-query";
import {getAxios, postAxios} from "@api/apiClient";
import { YearTable } from "@components/calendar/year/YearTable";
import { YearChart3 } from "@components/calendar/year/YearChart3";

const { Title: PageTitle } = Typography;

const YearComponent = ({ contentHeight }) => {

	// year
	const today = new Date();
	const [year, setYear] = useState([today.getFullYear(), today.getFullYear()]);
	const [list, setList] = useState([]);
	const [searchData, setSearchData] = useState({});
	const [isOneYear, setIsOneYear] = useState(true);

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
		getYear({year: year, searchData: searchData});
	}

	useEffect(() => {
		handleReload();
	}, [year, searchData]);

	useEffect(() => {
		if (year[0] === year[1]) {
			setIsOneYear(true);
		} else {
			setIsOneYear(false);
		}
	}, [list]);

	return (
		<Layout>
			<Flex gap="large" align="start" justify="space-between" className="contents-flex">
				<div className="contents-left">
					<div className="contents-top">
						<PageTitle level={2} className="title-page">
							연간 계획 현황
						</PageTitle>

						{isOneYear ? (
						<YearChart list={list}/>
							) : (
						<YearChart3 yearList={
							Array.isArray(year)
								? year.map((y) => parseInt(y, 10)).filter((y) => !isNaN(y))
								: []
						} />
						)}

						<YearHeader year={year} setYear={setYear} setSearchData={setSearchData} />
					</div>
				</div>
			</Flex>

			<Flex gap="large" align="start" justify="center" className="contents-flex">
				<YearTable list={list} />
			</Flex>

			<div className="info-wrap-last" />
		</Layout>
	);
};

export default YearComponent;
