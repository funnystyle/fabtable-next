import React from "react";
import { Flex } from "antd";
import { LoginLogo } from "@components/login/LoginLogo";
import { LoginCopyright } from "@components/login/LoginCopyright";
import { LoginForm } from "@components/login/LoginForm";
import { LoginPasswordChangeButton } from "@components/login/LoginPasswordChangeButton";

export const LoginTextOr = () => {
  return (
    <p className="txt-or">
      <span>또는</span>
    </p>
  );
};