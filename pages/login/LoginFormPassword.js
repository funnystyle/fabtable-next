import React, { useEffect } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useMutation } from "@tanstack/react-query";
import { postAxios } from "@api/apiClient";
import { setAccessToken } from "@lib/UserInfo";
import { LoginFormUsername } from "@pages/login/LoginFormUsername";

export const LoginFormPassword = ({ placeholder }) => {

	return (
			<Form.Item
				name="password"
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