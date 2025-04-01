export const csListRightItem = [
	{
		label: "C/S 상태변경",
		key: "1",
		children: [
			{
				key: "1-1",
				label: "접수",
			},
			{
				key: "1-2",
				label: "진행",
			},
			{
				key: "1-3",
				label: "종결",
			},
			{
				key: "1-4",
				label: "취소",
			},
		],
	},
	{
		label: "C/S 복제하기",
		key: "2",
	},
	{
		label: "C/S 이력",
		key: "3",
	},
	{
		label: "C/S 미리보기",
		key: "4",
	},
	{
		label: "수주 종합정보",
		key: "5",
		// disabled: true,
	},
	{
		type: "divider",
	},
	{
		label: "출력하기",
		key: "6",
		children: [
			{
				key: "6-1",
				label: "프린트",
			},
			{
				key: "6-2",
				label: "양식 다운로드",
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