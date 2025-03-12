import React from "react";
import { Flex, Button, Checkbox, Form, Input } from "antd";
import Link from "next/link";

export const LoginLogo = ({ logoUrl, title, subTitle }) => {
  return (
    <>
      <h1 className="login-logo">
        <img src={logoUrl} alt="FabTable Web System" />
        {title}
      </h1>

      <p className="login-descript">{subTitle}</p>
    </>
  );
};