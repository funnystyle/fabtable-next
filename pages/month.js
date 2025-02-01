// pages/month.js
import React, { useState } from "react";
import {
	Layout,
	Typography,
	Tabs,
	Select,
	DatePicker,
	ConfigProvider,
	Button,
	Input,
	Flex,
	Card,
	Space,
} from "antd";
import {
	CheckOutlined,
	SearchOutlined,
	PieChartOutlined,
	CloseOutlined,
} from "@ant-design/icons";
import koKR from "antd/es/locale/ko_KR";
import "dayjs/locale/ko";

const { Title } = Typography;
const { Search } = Input;

const onChange = (key) => {
	console.log(key);
};

const handleChange = (value) => {
	console.log(`selected ${value}`);
};

const TabItems = [
	{
		key: "1",
		label: "부서별 일정",
	},
	{
		key: "2",
		label: "현재 상태별 일정",
	},
	{
		key: "3",
		label: "고객사별 일정",
	},
	{
		key: "4",
		label: "모델별 일정",
	},
];

const month = () => {
	const [isVisible, setIsVisible] = useState(true);

	const toggleDiv = () => {
		setIsVisible(!isVisible); // 상태를 반전
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
					<Title level={4} className="title-page">
						월간 일정 달력
					</Title>

					<Tabs defaultActiveKey="1" items={TabItems} onChange={onChange} />

					<Flex align="start" justify="space-between">
						<Flex gap="small" align="center">
							<Select
								defaultValue="2024"
								style={{
									width: 80,
								}}
								onChange={handleChange}
								options={[
									{
										value: "2024",
										label: "2024",
									},
									{
										value: "2023",
										label: "2023",
									},
									{
										value: "2022",
										label: "2022",
									},
									{
										value: "2021",
										label: "2022",
									},
									{
										value: "2020",
										label: "2020",
									},
									{
										value: "2019",
										label: "2019",
									},
									{
										value: "2018",
										label: "2018",
									},
								]}
							/>

							<ConfigProvider locale={koKR}>
								<DatePicker
									onChange={onChange}
									picker="month"
									format="M 월"
									placeholder="선택"
									style={{
										width: 80,
									}}
								/>
							</ConfigProvider>

							<Button color="primary" variant="text" size="small">
								이번달
							</Button>
						</Flex>

						<Flex align="center">
							<Flex className="team-btn">
								<Button
									variant="outlined"
									icon={<CheckOutlined />}
									iconPosition="end"
									size="small"
									shape="round"
								>
									영업팀
								</Button>

								<Button
									variant="outlined"
									icon={<CheckOutlined />}
									iconPosition="end"
									size="small"
									shape="round"
								>
									생산팀
								</Button>

								<Button
									variant="outlined"
									icon={<CheckOutlined />}
									iconPosition="end"
									size="small"
									shape="round"
								>
									품질팀
								</Button>
							</Flex>

							<Flex gap="small">
								<Button variant="outlined" icon={<SearchOutlined />}>
									조건 검색
								</Button>

								<Button
									variant="outlined"
									icon={<PieChartOutlined />}
									onClick={() => setIsVisible(true)}
									className={isVisible ? "active" : ""}
								>
									총 현황 뷰
								</Button>
							</Flex>
						</Flex>
					</Flex>

					<table className="calendar-tb">
						<thead>
							<tr>
								<th className="sun">일</th>
								<th>월</th>
								<th>화</th>
								<th>수</th>
								<th>목</th>
								<th>금</th>
								<th className="sat">토</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className="other">
									<p className="day-txt">28</p>
								</td>
								<td className="other">
									<p className="day-txt">29</p>

									<ul className="schedule-txt-list delivery">
										<li>
											<span>납품계획</span>
											<strong>20</strong>
										</li>
										<li>
											<span>납품완료</span>
											<strong>19</strong>
										</li>
									</ul>

									<ul className="schedule-txt-list produce">
										<li>
											<span>생산계획</span>
											<strong>20</strong>
										</li>
										<li>
											<span>생산완료</span>
											<strong>19</strong>
										</li>
									</ul>

									<ul className="schedule-txt-list test">
										<li>
											<span>검사계획</span>
											<strong>20</strong>
										</li>
										<li>
											<span>검사완료</span>
											<strong>19</strong>
										</li>
									</ul>
								</td>
								<td className="other">
									<p className="day-txt">30</p>

									<ul className="schedule-txt-list delivery">
										<li>
											<span>납품계획</span>
											<strong>20</strong>
										</li>
										<li>
											<span>납품완료</span>
											<strong>19</strong>
										</li>
									</ul>

									<ul className="schedule-txt-list produce">
										<li>
											<span>생산계획</span>
											<strong>20</strong>
										</li>
										<li>
											<span>생산완료</span>
											<strong>19</strong>
										</li>
									</ul>

									<ul className="schedule-txt-list test">
										<li>
											<span>검사계획</span>
											<strong>20</strong>
										</li>
										<li>
											<span>검사완료</span>
											<strong>19</strong>
										</li>
									</ul>
								</td>
								<td>
									<p className="day-txt">01</p>

									<ul className="schedule-txt-list delivery">
										<li>
											<span>납품계획</span>
											<strong>20</strong>
										</li>
										<li>
											<span>납품완료</span>
											<strong>19</strong>
										</li>
									</ul>

									<ul className="schedule-txt-list produce">
										<li>
											<span>생산계획</span>
											<strong>20</strong>
										</li>
										<li>
											<span>생산완료</span>
											<strong>19</strong>
										</li>
									</ul>

									<ul className="schedule-txt-list test">
										<li>
											<span>검사계획</span>
											<strong>20</strong>
										</li>
										<li>
											<span>검사완료</span>
											<strong>19</strong>
										</li>
									</ul>
								</td>
								<td>
									<p className="day-txt">02</p>

									<ul className="schedule-txt-list delivery">
										<li>
											<span>납품계획</span>
											<strong>20</strong>
										</li>
										<li>
											<span>납품완료</span>
											<strong>19</strong>
										</li>
									</ul>

									<ul className="schedule-txt-list produce">
										<li>
											<span>생산계획</span>
											<strong>100</strong>
										</li>
										<li>
											<span>생산완료</span>
											<strong>19</strong>
										</li>
									</ul>

									<ul className="schedule-txt-list test">
										<li>
											<span>검사계획</span>
											<strong>50</strong>
										</li>
										<li>
											<span>검사완료</span>
											<strong>50</strong>
										</li>
									</ul>
								</td>
								<td className="today pick">
									<p className="day-txt">03</p>

									<ul className="schedule-txt-list delivery">
										<li>
											<span>납품계획</span>
											<strong>20</strong>
										</li>
										<li>
											<span>납품완료</span>
											<strong>19</strong>
										</li>
									</ul>

									<ul className="schedule-txt-list produce">
										<li>
											<span>생산계획</span>
											<strong>20</strong>
										</li>
										<li>
											<span>생산완료</span>
											<strong>19</strong>
										</li>
									</ul>

									<ul className="schedule-txt-list test">
										<li>
											<span>검사계획</span>
											<strong>20</strong>
										</li>
										<li>
											<span>검사완료</span>
											<strong>19</strong>
										</li>
									</ul>
								</td>
								<td>
									<p className="day-txt">04</p>
								</td>
							</tr>
							<tr>
								<td>
									<p className="day-txt">05</p>
								</td>
								<td>
									<p className="day-txt">06</p>

									<ul className="schedule-txt-list delivery">
										<li>
											<span>납품계획</span>
											<strong>20</strong>
										</li>
										<li>
											<span>납품완료</span>
											<strong>19</strong>
										</li>
									</ul>

									<ul className="schedule-txt-list test">
										<li>
											<span>검사계획</span>
											<strong>20</strong>
										</li>
										<li>
											<span>검사완료</span>
											<strong>19</strong>
										</li>
									</ul>
								</td>
								<td>
									<p className="day-txt">07</p>

									<ul className="schedule-txt-list delivery">
										<li>
											<span>납품계획</span>
											<strong>20</strong>
										</li>
										<li>
											<span>납품완료</span>
											<strong>19</strong>
										</li>
									</ul>

									<ul className="schedule-txt-list test">
										<li>
											<span>검사계획</span>
											<strong>20</strong>
										</li>
										<li>
											<span>검사완료</span>
											<strong>19</strong>
										</li>
									</ul>
								</td>
								<td>
									<p className="day-txt">08</p>

									<ul className="schedule-txt-list delivery">
										<li>
											<span>납품계획</span>
											<strong>20</strong>
										</li>
										<li>
											<span>납품완료</span>
											<strong>19</strong>
										</li>
									</ul>
								</td>
								<td>
									<p className="day-txt">09</p>

									<ul className="schedule-txt-list delivery">
										<li>
											<span>납품계획</span>
											<strong>20</strong>
										</li>
										<li>
											<span>납품완료</span>
											<strong>19</strong>
										</li>
									</ul>

									<ul className="schedule-txt-list produce">
										<li>
											<span>생산계획</span>
											<strong>100</strong>
										</li>
										<li>
											<span>생산완료</span>
											<strong>19</strong>
										</li>
									</ul>
								</td>
								<td>
									<p className="day-txt">10</p>

									<ul className="schedule-txt-list delivery">
										<li>
											<span>납품계획</span>
											<strong>20</strong>
										</li>
										<li>
											<span>납품완료</span>
											<strong>19</strong>
										</li>
									</ul>
								</td>
								<td>
									<p className="day-txt">11</p>
								</td>
							</tr>
							<tr>
								<td>
									<p className="day-txt">12</p>
								</td>
								<td>
									<p className="day-txt">13</p>

									<ul className="schedule-txt-list test">
										<li>
											<span>검사계획</span>
											<strong>20</strong>
										</li>
										<li>
											<span>검사완료</span>
											<strong>19</strong>
										</li>
									</ul>
								</td>
								<td>
									<p className="day-txt">14</p>
								</td>
								<td>
									<p className="day-txt">15</p>
								</td>
								<td>
									<p className="day-txt">16</p>

									<ul className="schedule-txt-list delivery">
										<li>
											<span>납품계획</span>
											<strong>20</strong>
										</li>
										<li>
											<span>납품완료</span>
											<strong>19</strong>
										</li>
									</ul>
								</td>
								<td>
									<p className="day-txt">17</p>
								</td>
								<td>
									<p className="day-txt">18</p>
								</td>
							</tr>
							<tr>
								<td>
									<p className="day-txt">19</p>
								</td>
								<td>
									<p className="day-txt">20</p>
								</td>
								<td>
									<p className="day-txt">21</p>
								</td>
								<td>
									<p className="day-txt">22</p>
								</td>
								<td>
									<p className="day-txt">23</p>
								</td>
								<td>
									<p className="day-txt">24</p>
								</td>
								<td>
									<p className="day-txt">25</p>
								</td>
							</tr>
							<tr>
								<td>
									<p className="day-txt">26</p>
								</td>
								<td>
									<p className="day-txt">27</p>
								</td>
								<td>
									<p className="day-txt">28</p>
								</td>
								<td>
									<p className="day-txt">29</p>
								</td>
								<td>
									<p className="day-txt">30</p>
								</td>
								<td>
									<p className="day-txt">31</p>
								</td>
								<td className="other">
									<p className="day-txt">01</p>
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				{isVisible && (
					<div className="contents-right">
						<Flex
							align="center"
							justify="space-between"
							className="title-total"
						>
							<Title level={4} className="title-page">
								총 현황
							</Title>

							<Button
								shape="circle"
								icon={<CloseOutlined />}
								size="small"
								onClick={toggleDiv}
							/>
						</Flex>

						<p className="total-date">
							<strong>2024</strong> 년 <strong>5</strong> 월
						</p>

						<Space direction="vertical" size={12} className="total-date-list">
							<Card title="영업일정">
								<Flex justify="space-between">
									<p className="txt-date">납품계획</p>
									<strong className="txt-num">880</strong>
								</Flex>
								<Flex justify="space-between">
									<p className="txt-date">납품완료</p>
									<strong className="txt-num">56</strong>
								</Flex>
							</Card>
							<Card title="생산일정">
								<Flex justify="space-between">
									<p className="txt-date">생산계획</p>
									<strong className="txt-num">880</strong>
								</Flex>
								<Flex justify="space-between">
									<p className="txt-date">생산완료</p>
									<strong className="txt-num">56</strong>
								</Flex>
							</Card>
							<Card title="검사일정">
								<Flex justify="space-between">
									<p className="txt-date">검사계획</p>
									<strong className="txt-num">880</strong>
								</Flex>
								<Flex justify="space-between">
									<p className="txt-date">검사완료</p>
									<strong className="txt-num">56</strong>
								</Flex>
							</Card>
						</Space>
					</div>
				)}
			</Flex>
		</Layout>
	);
};

export default month;
