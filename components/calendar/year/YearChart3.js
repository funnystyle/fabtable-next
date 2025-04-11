// pages/year.js
import React, { useEffect, useState } from "react";
import { Card, } from "antd";
import "dayjs/locale/ko";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, LineController, BarController } from "chart.js";
import { Bar } from "react-chartjs-2";
import { useMutation } from "@tanstack/react-query";
import { postAxios } from "@api/apiClient";
import ChartDataLabels from "chartjs-plugin-datalabels";

// Chart.js 플러그인 등록
ChartJS.register(
	LineController,
	BarController,
	CategoryScale,
	LinearScale,
	BarElement,
	LineElement,
	PointElement,
	Title,
	Tooltip,
	Legend,
	ChartDataLabels
);

const labels = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];

const chartColorData = [
	{ borderColor: "rgba(255, 99, 132, 1)", backgroundColor: "rgba(255, 99, 132, 0.5)", },
	{ borderColor: "rgba(255, 206, 86, 1)", backgroundColor: "rgba(255, 206, 86, 0.5)", },
	{ borderColor: "rgba(54, 162, 235, 1)", backgroundColor: "rgba(54, 162, 235, 0.5)", },
	{ borderColor: "rgba(75, 192, 192, 1)", backgroundColor: "rgba(75, 192, 192, 0.5)", },
	{ borderColor: "rgba(153, 102, 255, 1)", backgroundColor: "rgba(153, 102, 255, 0.5)", },
]

// ✅ 차트 컴포넌트 (막대그래프 + 꺾은선 그래프)
export const YearChart3 = ({ yearList }) => {

	const [data, setData] = useState({
		labels,
		datasets: [
			{
				type: "line",
				label: "납품 완료",
				data: [450, 650, 750, 550, 950, 1150, 1350, 1200, 850, 1050, 1400, 1550],
				borderColor: "rgba(255, 99, 132, 1)",
				backgroundColor: "rgba(255, 99, 132, 0.5)",
				fill: false,
				tension: 0.3, // 선 부드럽게
			},
			{
				type: "bar",
				label: "납품 계획",
				data: [500, 700, 800, 600, 1000, 1200, 1400, 1300, 900, 1100, 1500, 1600],
				backgroundColor: "rgba(54, 162, 235, 0.5)",
				borderColor: "rgba(54, 162, 235, 1)",
				borderWidth: 3,
			},
		],
	});

	const [chartData1, setChartData1] = useState([]);
	const [chartData2, setChartData2] = useState([]);
	const [chartData3, setChartData3] = useState([]);

	const { mutate: getYear1 } = useMutation({
		mutationKey: "getYear1",
		mutationFn: (values) => postAxios("/user/calendar/year", values),
		onSuccess: (response, variables) => {
			setChartData1(prevState =>  [{ year: variables.year[0], data: handleCompleteData(response.data.list) }]);
		}
	});

	const { mutate: getYear2 } = useMutation({
		mutationKey: "getYear2",
		mutationFn: (values) => postAxios("/user/calendar/year", values),
		onSuccess: (response, variables) => {
			setChartData2(prevState =>  [{ year: variables.year[0], data: handleCompleteData(response.data.list) }]);
		}
	});

	const { mutate: getYear3 } = useMutation({
		mutationKey: "getYear3",
		mutationFn: (values) => postAxios("/user/calendar/year", values),
		onSuccess: (response, variables) => {
			setChartData3(prevState =>  [{ year: variables.year[0], data: handleCompleteData(response.data.list) }]);
		}
	});

	const handleCompleteData = (list) => {
		const deliveryComplete = list.find(item => item.div === "납품완료");
		const deliveryCompleteData = [];
		if (deliveryComplete) {
			for (let i = 1; i <= 12; i++) {
				deliveryCompleteData.push(deliveryComplete[`month${i.toString().padStart(2, "0")}`]);
			}
		}
		return deliveryCompleteData;
	}


	useEffect(() => {
		if (yearList){
				getYear1({ year:[yearList[0], yearList[0] ] });
		}
	}, [yearList]);

	useEffect(() => {
		if (!chartData1) return;
		getYear2({ year:[yearList[0] + 1, yearList[0] + 1 ] });

	}, [chartData1]);

	useEffect(() => {
		if (!chartData2) return;
		if (yearList[0] + 1 === yearList[1] + 0) return;
		getYear3({ year:[yearList[0] + 2, yearList[0] + 2 ] });
	}, [chartData2]);

	useEffect(() => {
		const chartData = [...chartData1, ...chartData2, ...chartData3];

		const newDatasets = chartData.map((item, index) => {
			return {
				type: "bar", // "line" 으로 할 수도 있음
				label: item.year,
				data: item.data,
				backgroundColor: chartColorData[index].backgroundColor,
				borderColor: chartColorData[index].borderColor,
				borderWidth: 3,
				fill: false,
				tension: 0.3, // 선 부드럽게
			}
		});
		setData({...data, datasets: [...newDatasets]});

	}, [chartData1, chartData2, chartData3]);

	// 차트 옵션 설정
	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: "top",
			},
			datalabels: {
				anchor: "end", // 끝에 표시
				align: "end",  // 위쪽에 정렬
				formatter: (value, ctx) => {
					// if (ctx.dataset.type === "line") {
					// 	return `${value.toFixed(1)}%`;
					// }
					return value.toLocaleString();
				},
				font: {
					weight: "bold",
					size: 14,
				},
				color: (ctx) => {
					// if (ctx.dataset.type === "line") return "#EC6D85";
					return "#222";
				},
			},
		},
		scales: {
			y: {
				beginAtZero: true,
			},
		},
	};

	return (
		<Card style={{ width: "100%", textAlign: "center", marginBottom: "20px" }}>
			<div style={{ width: "100%", minHeight: "400px", height: "auto" }}>
				<Bar data={data} options={options} height={80}/>
			</div>
		</Card>
	);
};
