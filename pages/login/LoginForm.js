import React, { useEffect, useState } from "react";
import { Flex, Button, Checkbox, Form, Input, message } from "antd";
import Link from "next/link";
import { LoginLogo } from "@pages/login/LoginLogo";
import { LoginImage } from "@pages/login/LoginImage";
import { LoginCopyright } from "@pages/login/LoginCopyright";
import { useMutation } from "@tanstack/react-query";
import { postAxios } from "@api/apiClient";
import { setAccessToken } from "@lib/UserInfo";

export const LoginForm = () => {

	const [form] = Form.useForm();

	const { mutate: login, data:loginResponse, error:loginError} = useMutation({
		mutationKey: "login",
		mutationFn: (values) => postAxios("/user/login", values),
	});

	useEffect(() => {
		if (loginResponse) {
			const token = loginResponse?.data.grantType + " " + loginResponse?.data.accessToken;
			console.log("token : ", token);
			setAccessToken(token);
		}
	}, [loginResponse]);

	useEffect(() => {
		if (loginError) {
			console.log("loginError : ", loginError);
			if (loginError.response.data.code === 404) {
				const message = loginError.response.data.message;
				form.setFields([
					{
						name: "username",
						errors: [message],
					},
				]);
			} else if (loginError.response.data.code === 401) {
				const message = loginError.response.data.message;
				form.setFields([
					{
						name: "password",
						errors: [message],
					},
				]);
			}
		}
	}, [loginError]);

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	return (
		<Form
			form={form}
			name="basic"
			initialValues={{
				remember: true,
			}}
			onFinish={(values) => login(values)}
			onFinishFailed={onFinishFailed}
			autoComplete="off"
			size="large"
		>
			<Form.Item
				name="username"
				rules={[
					{
						required: true,
						message: "아이디를 입력하세요",
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
						message: "비밀번호를 입력하세요",
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
	);
};