import React, { useState } from "react";
import { Layout, Menu, Button } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* 상단 헤더 */}
      <Header
        style={{
          padding: "0 16px",
          background: "#fff",
          display: "flex",
          alignItems: "center",
          position: "fixed",
          width: "100%",
          zIndex: 1000,
          height: "64px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{
          display: "flex",
          alignItems: "center",
          width: collapsed ? "56px" : "260px",
          transition: "width 0.2s ease-in-out",
          justifyContent: "space-between"
        }}>
          {/* 로고 */}
          <div
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "18px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              opacity: collapsed ? 0 : 1,
              transition: "opacity 0.3s ease-in-out",
              display: collapsed ? "none" : "block",
            }}
          >
            LOGO
          </div>
          {/* 햄버거 버튼 */}
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "18px",
              transition: "margin-right 0.2s ease-in-out",
              marginRight: collapsed ? "0" : "16px"
            }}
          />
        </div>
      </Header>

      {/* 헤더 아래 전체 레이아웃 */}
      <Layout style={{ marginTop: "64px" }}>
        {/* GNB (왼쪽 메뉴) */}
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          width={260}
          collapsedWidth={56}
          style={{
            background: "#f0f2f5",
            height: "calc(100vh - 64px)",
            position: "fixed",
            left: 0,
            top: "64px",
            overflow: "auto",
          }}
        >
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={["1"]}
            inlineIndent={collapsed ? 0 : 24}
          >
            <Menu.SubMenu key="sub1" icon={<HomeOutlined />} title="Dashboard">
              <Menu.Item key="1">Overview</Menu.Item>
              <Menu.SubMenu key="sub1-2" title="Reports">
                <Menu.Item key="2">Sales Report</Menu.Item>
                <Menu.Item key="3">User Report</Menu.Item>
              </Menu.SubMenu>
            </Menu.SubMenu>

            <Menu.SubMenu key="sub2" icon={<UserOutlined />} title="User Management">
              <Menu.Item key="4">Users</Menu.Item>
              <Menu.Item key="5">Roles</Menu.Item>
            </Menu.SubMenu>

            <Menu.SubMenu key="sub3" icon={<SettingOutlined />} title="Settings">
              <Menu.Item key="6">General</Menu.Item>
              <Menu.Item key="7">Security</Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </Sider>

        {/* 오른쪽 본문 컨텐츠 */}
        <Layout
          style={{
            marginLeft: collapsed ? "56px" : "260px",
            transition: "margin-left 0.2s ease-in-out",
            padding: "16px",
          }}
        >
          <Content
            style={{
              margin: "16px",
              padding: "16px",
              background: "#fff",
              borderRadius: "8px",
              minHeight: "calc(100vh - 96px)",
            }}
          >
            <h2>Welcome to the Dashboard</h2>
            <p>This is your content area.</p>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
