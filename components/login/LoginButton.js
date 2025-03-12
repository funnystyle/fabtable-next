import React, { useEffect } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useMutation } from "@tanstack/react-query";
import { postAxios } from "@api/apiClient";
import { setAccessToken } from "@lib/UserInfo";
import { LoginFormUsername } from "@components/login/LoginFormUsername";
import { LoginFormPassword } from "@components/login/LoginFormPassword";

export const LoginButton = ({ buttonText }) => {

	return (
		<Form.Item label={null} className="btn-login">
			<Button type="primary" htmlType="submit" size="large" block>
				{buttonText}
			</Button>
		</Form.Item>
	);
};