export const orderListRightItem = [
	{
		label: "수주 종합정보",
		key: "1",
	},
	{
		label: "수주 복제하기",
		key: "2",
	},
	{
		label: "수주 일괄수정",
		key: "3",
	},
	{
		label: "수주 상태변경",
		key: "4",
		children: [
			{
				key: "4-1",
				label: "입고완료",
			},
			{
				key: "4-2",
				label: "납품완료",
			},
			{
				key: "4-3",
				label: "반출대기",
			},
			{
				key: "4-2",
				label: "반출완료",
			},
		],
	},
	{
		label: "부서별 메모",
		key: "5",
	},
	{
		type: "divider",
	},
	{
		label: "인쇄하기",
		key: "6",
		children: [
			{
				key: "6-1",
				label: "라벨 인쇄",
			},
			{
				key: "6-2",
				label: "성적서 인쇄",
			},
		],
	},
	{
		label: "엑셀 다운로드",
		key: "7",
		children: [
			{
				key: "7-1",
				label: "편집 항목만",
				children: [
					{
						key: "7-1-1",
						label: "선택한 행",
					},
					{
						key: "7-1-2",
						label: "전체 행",
					},
				],
			},
			{
				key: "7-2",
				label: "전체 항목",
				children: [
					{
						key: "7-2-1",
						label: "선택한 행",
					},
					{
						key: "7-2-2",
						label: "전체 행",
					},
				],
			},
		],
	},
	{
		type: "divider",
	},
	{
		label: "삭제하기",
		key: "8",
	},
];