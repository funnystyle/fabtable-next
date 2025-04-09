// pages/changepw.js
import React from "react";
import { Flex, Button, Form, Input } from "antd";
import Link from "next/link";

const onFinish = (values) => {
	console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
	console.log("Failed:", errorInfo);
};

const changePwComponent = () => {
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
							<Input placeholder="아이디 입력" />
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
							<Input.Password placeholder="현재 비밀번호 입력" />
						</Form.Item>

						<div className="btn-login">
							<Link href={"/publish/login/changenewpw"}>
								<Button type="primary" htmlType="submit" size="large" block>
									확인
								</Button>
							</Link>
						</div>
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

changePwComponent.getLayout = (page) => page;

export default changePwComponent;
