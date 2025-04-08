export const produceListRightItem = [
	{
		label: "제조 공정",
		key: "1",
		children: [
			{
				key: "1-1",
				label: "조립 공정",
			},
			{
				key: "1-2",
				label: "내부리크 공정",
			},
			{
				key: "1-3",
				label: "외부리크 공정",
			},
			{
				key: "1-4",
				label: "PID교정 공정",
			},
			{
				key: "1-5",
				label: "케이스조립 공정",
			},
			{
				key: "1-6",
				label: "압력교정 공정",
			},
			{
				key: "1-7",
				label: "유량교정 공정",
			},
			{
				key: "1-8",
				label: "PI교정 공정",
			},
			{
				key: "1-9",
				label: "포장 공정",
			},
			{
				key: "1-10",
				label: "입고 공정",
			},
		],
	},
	{
		label: "현재상태 변경",
		key: "2",
		children: [
			{
				key: "2-1",
				label: "처분대기",
			},
			{
				key: "2-2",
				label: "처분완료",
			},
		],
	},
	{
		type: "divider",
	},
	{
		label: "수주 종합정보",
		key: "3",
	},
	{
		label: "부적합 이력",
		key: "4",
	},
	{
		label: "제어계수 정보",
		key: "5",
	},
	{
		label: "비율제어 정보",
		key: "6",
	},
	{
		label: "부서별 메모",
		key: "7",
	},
	{
		type: "divider",
	},
	{
		label: "인쇄하기",
		key: "6",
		children: [
			{
				key: "6-2",
				label: "성적서 인쇄",
			},
			{
				key: "6-1",
				label: "라벨 인쇄",
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
		],
	},
];