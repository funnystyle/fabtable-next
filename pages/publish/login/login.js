// pages/login.js
import React from "react";
import { Flex, Button, Checkbox, Form, Input } from "antd";
import Link from "next/link";

const onFinish = (values) => {
	console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
	console.log("Failed:", errorInfo);
};

const loginComponent = () => {
	return (
		<Flex className="login-wrap">
			{/* <Flex className="login-img">이미지 영역</Flex> */}

			<Flex className="login-box-area">
				<div className="login-box">
					<h1 className="login-logo">
						<img src={"/images/logo.svg"} />
						FabTable Web System
					</h1>

					<p className="login-descript">안녕하세요! 로그인 정보를 입력하세요</p>

					<Form
						name="basic"
						initialValues={{
							remember: true,
						}}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						autoComplete="off"
						size="large"
					>
						<Form.Item
							name="username"
							rules={[
								{
									required: true,
									message: "아이디가 존재하지 않습니다",
								},
							]}
						>
							<Input placeholder="아이디" />
						</Form.Item>

						<Form.Item
							name="password"
							rules={[
								{
									required: true,
									message: "입력하신 내용이 일치하지 않습니다",
								},
							]}
						>
							<Input.Password placeholder="비밀번호" />
						</Form.Item>

						<Form.Item name="remember" valuePropName="checked" label={null}>
							<Checkbox>로그인 정보 저장</Checkbox>
						</Form.Item>

						<Form.Item label={null} className="btn-login">
							<Button type="primary" htmlType="submit" size="large" block>
								로그인
							</Button>
						</Form.Item>
					</Form>

					<p className="txt-or">
						<span>또는</span>
					</p>

					<Link href={"/publish/login/changepw"}>
						<Button type="link" block>
							비밀번호 변경
						</Button>
					</Link>
				</div>

				<p className="copyright">© MKP. All rights reserved</p>
			</Flex>
		</Flex>
	);
};

loginComponent.getLayout = (page) => page;

export default loginComponent;
