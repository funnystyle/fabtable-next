export const orderListRightItem = [
	{
		label: "수주 복제하기",
		key: "1",
	},
	{
		label: "수주 일괄수정",
		key: "2",
	},
	{
		label: "수주 종합정보",
		key: "3",
	},
	{
		label: "메모 수정",
		key: "4",
	},
	{
		type: "divider",
	},
	{
		label: "인쇄하기",
		key: "5",
		children: [
			{
				key: "5-1",
				label: "라벨 인쇄",
			},
			{
				key: "5-2",
				label: "성적서 인쇄",
			},
		],
	},
	{
		label: "엑셀 다운로드",
		key: "6",
		children: [
			{
				key: "6-1",
				label: "편집 항목만",
				children: [
					{
						key: "6-1-1",
						label: "선택한 행",
					},
					{
						key: "6-1-2",
						label: "전체 행",
					},
				],
			},
			{
				key: "6-2",
				label: "전체 항목",
				children: [
					{
						key: "6-2-1",
						label: "선택한 행",
					},
					{
						key: "6-2-2",
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
		key: "7",
	},
];