// pages/modal.js
import React from "react";
import { Layout, Button, Space, message, Alert } from "antd";

const MessageComponent = ({}) => {
	const [messageApi, contextHolder] = message.useMessage();

	const info = () => {
		messageApi.info("message");
	};

	const success = () => {
		messageApi.open({
			type: "success",
			content: "This is a success message",
		});
	};

	const error = () => {
		messageApi.open({
			type: "error",
			content: "This is an error message",
		});
	};

	const warning = () => {
		messageApi.open({
			type: "warning",
			content: "This is a warning message",
		});
	};

	return (
		<Layout>
			{contextHolder}
			<br />
			<Space>
				<Button onClick={info}>Normal</Button>
				<Button onClick={success}>Success</Button>
				<Button onClick={error}>Error</Button>
				<Button onClick={warning}>Warning</Button>
			</Space>
			<br />
			<br />
			<Alert message="얼럿 메시지 출력" type="success" showIcon closable />
			<br />
			<Alert message="얼럿 메시지 출력" type="info" showIcon closable />
			<br />
			<Alert message="얼럿 메시지 출력" type="warning" showIcon closable />
			<br />
			<Alert message="얼럿 메시지 출력" type="error" showIcon closable />
			<br />
			<Alert
				message="얼럿 메시지 출력"
				description="상세 설멸 내용 출력될 때. 2줄 일 때 아래로 떨어짐. line-height 18로 변경. 긴 내용일 때 예시 긴 내용일 때 예시긴 내용일 때 예시"
				type="success"
				showIcon
				closable
			/>
			<br />
			<Alert
				message="얼럿 메시지 출력"
				description="상세 설멸 내용 출력될 때. 2줄 일 때 아래로 떨어짐. line-height 18로 변경. 긴 내용일 때 예시 긴 내용일 때 예시긴 내용일 때 예시"
				type="info"
				showIcon
				closable
			/>
			<br />
			<Alert
				message="얼럿 메시지 출력"
				description="상세 설멸 내용 출력될 때. 2줄 일 때 아래로 떨어짐. line-height 18로 변경. 긴 내용일 때 예시 긴 내용일 때 예시긴 내용일 때 예시"
				type="warning"
				showIcon
				closable
			/>
			<br />
			<Alert
				message="얼럿 메시지 출력"
				description="상세 설멸 내용 출력될 때. 2줄 일 때 아래로 떨어짐. line-height 18로 변경. 긴 내용일 때 예시 긴 내용일 때 예시긴 내용일 때 예시"
				type="error"
				showIcon
				closable
			/>
		</Layout>
	);
};

export default MessageComponent;
