// pages/year.js
import React from "react";
import { Card, } from "antd";
import "dayjs/locale/ko";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, LineController, BarController } from "chart.js";
import { Bar } from "react-chartjs-2";

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
	Legend
);

// ✅ 차트 컴포넌트 (막대그래프 + 꺾은선 그래프)
export const YearChart = () => {
	// 데이터셋 정의
	const data = {
		labels: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
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
	};

	// 차트 옵션 설정
	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top",
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
			<Bar data={data} options={options} height={80}/>
		</Card>
	);
};
