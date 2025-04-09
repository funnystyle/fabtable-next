// pages/changepw.js
import React, { useState } from "react";
import { Flex, Button, Checkbox, Form, Input } from "antd";

const onFinish = (values) => {
	console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
	console.log("Failed:", errorInfo);
};

const changeNewPwComponent = () => {
	return (
		<Flex className="login-wrap">
			{/* <Flex className="login-img">이미지 영역</Flex> */}

			<Flex className="login-box-area">
				<div className="login-box">
					<h1 className="login-logo">
						<img src={"/images/logo.svg"} />
						비밀번호 변경
					</h1>

					<p className="login-descript">
						비밀번호 초기화는 관리자에게 문의하세요
					</p>

					<Form
						name="basic"
						initialValues={{ username: "mkpsemi-4230" }}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						autoComplete="off"
						size="large"
						className="input-login-area"
					>
						<Form.Item name="username" hasFeedback validateStatus="success">
							<Input placeholder="아이디 입력" id="success" readOnly />
						</Form.Item>

						<Form.Item
							name="newPassword"
							rules={[
								{
									required: true,
									message: "영문, 숫자, 특수문자만 입력하세요 (최소 4자리)",
								},
							]}
						>
							<Input.Password placeholder="새 비밀번호 입력" />
						</Form.Item>

						<Form.Item
							name="newPassword2"
							rules={[
								{
									required: true,
									message: "입력하신 내용이 일치하지 않습니다",
								},
							]}
						>
							<Input.Password placeholder="새 비밀번호 재확인" />
						</Form.Item>

						<Form.Item label={null} className="btn-login">
							<Button type="primary" htmlType="submit" size="large" block>
								비밀번호 변경
							</Button>
						</Form.Item>
					</Form>

					<p className="txt-or">
						<span>또는</span>
					</p>

					<Button type="link" block>
						비밀번호 변경 취소
					</Button>
				</div>

				<p className="copyright">© MKP. All rights reserved</p>
			</Flex>
		</Flex>
	);
};

changeNewPwComponent.getLayout = (page) => page;

export default changeNewPwComponent;
