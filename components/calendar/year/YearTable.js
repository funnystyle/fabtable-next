// pages/year.js
import React, { useEffect, useState } from "react";
import { Card, Table, } from "antd";
import "dayjs/locale/ko";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, LineController, BarController } from "chart.js";
import { Bar } from "react-chartjs-2";
import { yearTableColumns } from "@components/calendar/year/data/yearTableColumns";
import CustomEmpty from "@/components/common/CustomEmpty";

// ✅ 차트 컴포넌트 (막대그래프 + 꺾은선 그래프)
export const YearTable = ({ list }) => {

	return (
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
						locale={{ emptyText: <CustomEmpty /> }}
					/>
				),
				// ) : null,
				rowExpandable: (record) => record.key === list.length - 5
			}}
			locale={{ emptyText: <CustomEmpty /> }}
		/>
	);
};
