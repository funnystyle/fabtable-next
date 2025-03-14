// pages/month.js
import React from "react";
import { Button, Card, Flex, Space, Typography, } from "antd";
import { CloseOutlined, } from "@ant-design/icons";
import "dayjs/locale/ko";

const { Title } = Typography;

const MonthRightContent = ({ visibleItems, setVisibleItems, monthTotalList, year, month }) => {

	const closeItem = (index) => {
		setVisibleItems((prev) =>
			prev.map((item, i) => (i === index ? false : item))
		);
	};

	return (
		<>
			{visibleItems[3] && (
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
							onClick={() => closeItem(3)}
						/>
					</Flex>

					<p className="total-date">
						<strong>{year}</strong> 년 <strong>{month}</strong> 월
					</p>

					<Space direction="vertical" size={12} className="total-date-list">
						{visibleItems[0] && (
							<Card title="영업일정">
								<Flex justify="space-between">
									<p className="txt-date">납품계획</p>
									<strong className="txt-num">{monthTotalList[0]}</strong>
								</Flex>
								<Flex justify="space-between">
									<p className="txt-date">납품완료</p>
									<strong className="txt-num">{monthTotalList[1]}</strong>
								</Flex>
							</Card>
						)}

						{visibleItems[1] && (
							<Card title="생산일정">
								<Flex justify="space-between">
									<p className="txt-date">생산계획</p>
									<strong className="txt-num">{monthTotalList[2]}</strong>
								</Flex>
								<Flex justify="space-between">
									<p className="txt-date">생산완료</p>
									<strong className="txt-num">{monthTotalList[3]}</strong>
								</Flex>
							</Card>
						)}

						{visibleItems[2] && (
							<Card title="검사일정">
								<Flex justify="space-between">
									<p className="txt-date">검사계획</p>
									<strong className="txt-num">{monthTotalList[4]}</strong>
								</Flex>
								<Flex justify="space-between">
									<p className="txt-date">검사완료</p>
									<strong className="txt-num">{monthTotalList[5]}</strong>
								</Flex>
							</Card>
						)}
					</Space>
				</div>
			)}
		</>
	);
};

export default MonthRightContent;
