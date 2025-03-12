import React, { useEffect } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useMutation } from "@tanstack/react-query";
import { postAxios } from "@api/apiClient";
import { setAccessToken } from "@lib/UserInfo";
import { LoginFormUsername } from "@components/login/LoginFormUsername";

export const LoginFormPassword = ({ name = "password", placeholder }) => {
	return (
			<Form.Item
				name={name}
				rules={[
					{
						required: true,
						message: "비밀번호를 입력하세요",
					},
				]}
			>
				<Input.Password placeholder={placeholder} />
			</Form.Item>
	);
};