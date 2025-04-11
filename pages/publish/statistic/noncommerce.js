import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    LineController,
    BarController
} from "chart.js";
import { Button, Card, ConfigProvider, DatePicker, Flex, Layout, Tag, Typography } from "antd";
import { LeftOutlined, RightOutlined, SearchOutlined } from "@ant-design/icons";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    LineController,
    BarController,
    ChartDataLabels
);
import koKR from "antd/es/locale/ko_KR";
import "dayjs/locale/ko";
import dayjs from "dayjs";

const { Title: PageTitle } = Typography;

const yearRawData = [
  { year: 2023, finalInspection: 1500, defective: 120 },
  { year: 2024, finalInspection: 1800, defective: 150 },
  { year: 2025, finalInspection: 2100, defective: 180 },
];

const monthRawData = [
  { month: "1월", finalInspection: 200, defective: 15 },
  { month: "2월", finalInspection: 180, defective: 12 },
  { month: "3월", finalInspection: 220, defective: 18 },
  { month: "4월", finalInspection: 250, defective: 20 },
  { month: "5월", finalInspection: 240, defective: 22 },
  { month: "6월", finalInspection: 230, defective: 19 },
  { month: "7월", finalInspection: 260, defective: 21 },
  { month: "8월", finalInspection: 270, defective: 24 },
  { month: "9월", finalInspection: 280, defective: 26 },
  { month: "10월", finalInspection: 290, defective: 25 },
  { month: "11월", finalInspection: 310, defective: 28 },
  { month: "12월", finalInspection: 320, defective: 30 },
];

const yearChartData = {
  labels: yearRawData.map(item => item.year.toString()), // 연도 라벨 생성
  datasets: [
      {
          type: "bar",
          label: "최종검사 수량",
          data: yearRawData.map(item => item.finalInspection), // 최종검사 수량 데이터
          backgroundColor: "rgba(54, 162, 235, 0.6)",
          yAxisID: "y",
      },
      {
          type: "bar",
          label: "불량 수량",
          data: yearRawData.map(item => item.defective), // 불량 수량 데이터
          backgroundColor: "rgba(255, 99, 132, 0.6)",
          yAxisID: "y",
      },
      {
          type: "line",
          label: "불량률",
          data: yearRawData.map(item => (item.defective / item.finalInspection) * 100), // 불량률 계산
          borderColor: "rgba(255, 206, 86, 1)",
          borderWidth: 2,
          fill: false,
          yAxisID: "y2",
      },
  ],
};

const monthChartData = {
  labels: monthRawData.map(item => item.month), // 월 라벨 생성
  datasets: [
      {
          type: "bar",
          label: "최종검사 수량",
          data: monthRawData.map(item => item.finalInspection),
          backgroundColor: "rgba(54, 162, 235, 0.6)",
          yAxisID: "y",
      },
      {
          type: "bar",
          label: "불량 수량",
          data: monthRawData.map(item => item.defective),
          backgroundColor: "rgba(255, 99, 132, 0.6)",
          yAxisID: "y",
      },
      {
          type: "line",
          label: "불량률(%)",
          data: monthRawData.map(item => (item.defective / item.finalInspection) * 100),
          borderColor: "rgba(255, 206, 86, 1)",
          borderWidth: 2,
          fill: false,
          yAxisID: "y2",
      },
  ],
};

// 📌 공통 옵션 (불량률 Y축 최대값 100%)
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
        position: "bottom",
    },
    datalabels: {
      anchor: "end", // 끝에 표시
      align: "end",  // 위쪽에 정렬
      formatter: (value, ctx) => {
        if (ctx.dataset.type === "line") {
          return `${value.toFixed(1)}%`;
        }
        return value.toLocaleString();
      },
      font: {
        weight: "bold",
        size: 14,
      },
      color: (ctx) => {
        if (ctx.dataset.type === "line") return "#EC6D85";
        return "#222";
      },
    },
  },
  scales: {
      y: {
          type: "linear",
          position: "left",
          title: {
              display: true,
              text: "수량",
          },
      },
      y2: {
          type: "linear",
          position: "right",
          title: {
              display: true,
              text: "불량률(%)",
          },
          grid: {
              drawOnChartArea: false,
          },
          min: 0,
          max: 100,
      },
  },
};

const NonCommerce = () => {
  const [selectedYear, setSelectedYear] = useState(dayjs()); // 현재 연도 기본값
  const [open, setOpen] = useState(false); // 팝업 상태 관리
  const [tags, setTags] = useState([
    "2024-01-01 ~ 2025-02-22",
    "MARU",
    "7000s",
    "9000s",
    "2024-01-01 ~ 2025-02-22",
    "MARU",
    "7000s",
    "9000s",
    "2024-01-01 ~ 2025-02-22",
    "MARU",
    "7000s",
    "9000s",
    "2024-01-01 ~ 2025-02-22",
    "MARU",
    "7000s",
    "9000s",
    "2024-01-01 ~ 2025-02-22",
    "MARU",
    "7000s",
    "9000s",
  ]);

  // 개별 태그 삭제 핸들러
  const handleTagClose = (tagToRemove) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
  };

  const handleTagDeleteAll = () => {
    setTags([]);
  };

  // 📌 날짜 변경 핸들러
  const onChange = (date) => {
    if (date) {
        setSelectedYear(date);
    }
  };

  // 📌 이전 해로 변경
  const handlePrevYear = () => {
      setSelectedYear((prev) => prev.subtract(1, "year"));
  };

  // 📌 다음 해로 변경
  const handleNextYear = () => {
      setSelectedYear((prev) => prev.add(1, "year"));
  };

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
							최종검사 불량률 집계 현황
						</PageTitle>

            <Flex align="start" justify="space-between">
							{/*  검색결과 */}
              <Flex align="center" className="search-result-area">
                <strong className="tit-search-result">검색결과 :</strong>

                {tags.map((tag, index) => (
                  <Tag key={index} closeIcon onClose={() => handleTagClose(tag)}>
                    {tag}
                  </Tag>
                ))}

                <Button
                  color="primary"
                  variant="text"
                  size="small"
                  className="all-delete-tag"
                  onClick={handleTagDeleteAll}
                >
                  모두 삭제
                </Button>
              </Flex>

							<Flex gap="small" align="center">
								<Button
									color="primary"
									variant="text"
									size="small"
									className="all-delete-tag"
									// onClick={handleTagDeleteAll}
								>
									초기화
								</Button>

								<Flex gap="small">
									<Button variant="outlined" icon={<SearchOutlined />}>
										검색 조건 설정
									</Button>
								</Flex>
							</Flex>
						</Flex>

            <div style={{ display: "flex", width: "100%", gap: "10px", height: "620px", paddingTop: "20px", flexWrap: "wrap" }}>

              {/* 차트: 가로 1/3 */}
              <Card 
                style={{ flexGrow: 1, flexShrink: 1, flexBasis: "0%", minWidth: "200px", maxWidth: "33%", height: "100%", display: "flex", flexDirection: "column" }}
                styles={{ body: { flexGrow: 1, display: "flex", flexDirection: "column" }}}
              >
                <div style={{ fontWeight: "bold", paddingBottom: "16px" }}>
                <Flex gap="small" align="center" style={{ height: "40px" }}>
                  <h2>연간 누적 비교 (최근 3년)</h2>
                  </Flex>
                </div>
                <div style={{ flexGrow: 1, display: "flex" }}>
                  <Bar data={yearChartData} options={chartOptions} style={{ width: "100%", height: "500px" }} />
                </div>
              </Card>

              {/* 빈 영역: 가로 2/3 */}
              <Card 
                style={{ flexGrow: 2, flexShrink: 1, flexBasis: "0%", minWidth: "300px", maxWidth: "67%", height: "100%", display: "flex", flexDirection: "column" }}
                styles={{ body: { flexGrow: 1, display: "flex", flexDirection: "column" }}}
              >

                <div style={{ fontWeight: "bold", paddingBottom: "16px" }}>
                  <Flex align="start" justify="space-between">
                    <Flex gap="small" align="center" style={{ height: "40px" }}>

                      <button onClick={handlePrevYear} className="btn-page">
                        <LeftOutlined />
                      </button>
                    
                      <ConfigProvider locale={koKR}>
                        <DatePicker
                          value={selectedYear}
                          onChange={onChange}
                          picker="year"
                          format="YYYY"
                          placeholder="선택"
                          style={{ width: 80, height: 32 }}
                          allowClear={false} // X 버튼 제거
                          // suffixIcon={null} // 아이콘 제거
                          open={open}
                          onOpenChange={setOpen} // 팝업 상태 관리
                          renderExtraFooter={() => (
                            <div style={{ textAlign: "center", padding: "8px" }}>
                              <Button
                                type="link"
                                onClick={() => {
                                  setSelectedYear(dayjs());
                                  setTimeout(() => setOpen(false), 100); // ✅ 100ms 후 닫기 (딜레이 추가)
                                }}
                              >
                                올해
                              </Button>
                            </div>
                          )}
                        />
                      </ConfigProvider>

                      <button onClick={handleNextYear} className="btn-page">
                        <RightOutlined />
                      </button>
                    </Flex>

                    <Flex gap="small" align="center">
                      <Button variant="outlined">올해</Button>
                      <Button variant="outlined">작년</Button>
                      <Button variant="outlined">내년</Button>
                    </Flex>
                  </Flex>
                </div>
                <div style={{ flexGrow: 1, display: "flex" }}>
                  <Bar data={monthChartData} options={chartOptions} style={{ width: "100%", height: "500px" }} />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Flex>
    </Layout>

  );
};

export default NonCommerce;
