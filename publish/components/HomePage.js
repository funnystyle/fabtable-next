"use client";

// pages/index.js
import React, { lazy, startTransition, Suspense, useEffect, useLayoutEffect, useState } from "react";
import { Button, Layout, Menu, Skeleton, Tabs, Tag } from "antd";
import { useRouter } from "next/router";
// import dynamic from "next/dynamic";
import { AppstoreOutlined, BellOutlined, ClockCircleOutlined, MenuFoldOutlined, QuestionCircleFilled, UserOutlined, } from "@ant-design/icons";

import Link from "next/link";
import DateHeader from "./DateHeader";
import { TabContext } from "@/context/TabContext";
import { adminItems, basicItems } from "@components/menu/data/menuItems";
import useMenuTabStore from "@store/useMenuTabStore";

const { Header, Sider, Content } = Layout;

// 🔹 동적으로 페이지 로딩
const pageComponents = {
  "/dashboard": lazy(() => import("@/pages/dashboard")),
  "/calendar/year": lazy(() => import("@/pages/calendar/year")),
  // "/publish/year3": lazy(() => import("@/pages/publish/year3")),
  "/calendar/month": lazy(() => import("@/pages/calendar/month")),
  "/publish/order": lazy(() => import("@/pages/publish/order")),
  "/publish/orderwrite": lazy(() => import("@/pages/publish/orderwrite")),
  "/order/list": lazy(() => import("@/pages/order/list")),
  "/order/create": lazy(() => import("@/pages/order/create")),
  "/publish/cs": lazy(() => import("@/pages/publish/cs")),
  "/publish/cswrite": lazy(() => import("@/pages/publish/cswrite")),
  "/cs/list": lazy(() => import("@/pages/cs/list")),
  "/cs/create": lazy(() => import("@/pages/cs/create")),
  // "/publish/produce": lazy(() => import("@/pages/publish/produce")),
  // "/publish/qc": lazy(() => import("@/pages/publish/qc")),
  "/publish/statistic/noncommerce": lazy(() =>
    import("@/pages/publish/statistic/noncommerce")
  ),
  // "/publish/cycletime": lazy(() => import("@/pages/publish/cycletime")),
  // "/publish/spc": lazy(() => import("@/pages/publish/spc")),

  // 관리자 페이지
  // "/publish/admin/code": lazy(() => import("@/pages/publish/admin/code")),
  // "/publish/admin/product": lazy(() => import("@/pages/publish/admin/product")),
  // "/publish/admin/detail": lazy(() => import("@/pages/publish/admin/detail")),
  // "/publish/admin/noncommerce/type": lazy(() => import("@/pages/publish/admin/noncommerce/type")),
  // "/publish/admin/noncommerce/config": lazy(() => import("@/pages/publish/admin/noncommerce/config")),
  // "/publish/admin/file": lazy(() => import("@/pages/publish/admin/file")),
  // "/publish/admin/depart": lazy(() => import("@/pages/publish/admin/depart")),
  // "/publish/admin/user": lazy(() => import("@/pages/publish/admin/user")),
  // "/publish/admin/worker": lazy(() => import("@/pages/publish/admin/worker")),
};

const topItems = [
  {
    key: "alarm",
    label: "알람",
    icon: <BellOutlined />,
  },
  {
    key: "menu",
    label: "퀵메뉴",
    icon: <AppstoreOutlined />,
  },
  {
    key: "CTA",
    label: "CTA",
    icon: <UserOutlined />,
    className: "user",
    children: [
      {
        type: "group",
        label: "Item 1",
        children: [
          {
            label: "Option 1",
            key: "setting:1",
          },
          {
            label: "Option 2",
            key: "setting:2",
          },
        ],
      },
      {
        type: "group",
        label: "Item 2",
        children: [
          {
            label: "Option 3",
            key: "setting:3",
          },
          {
            label: "Option 4",
            key: "setting:4",
          },
        ],
      },
    ],
  },
];

const HomePage = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [contentHeight, setContentHeight] = useState("100vh");

  const { tabs, setTabs, activeTab, setActiveTab, selectedMenuKeys, setSelectedMenuKeys, openKeys, setOpenKeys } = useMenuTabStore()
  const router = useRouter();

  // 📌 메뉴 클릭 시 탭 추가 및 GNB 활성화
  const handleMenuClick = ({ key }) => {
    const menuItem = findMenuItemByKey([...basicItems, ...adminItems], key);
    if (!menuItem || !menuItem.url) return;

    if (!tabs.some((tab) => tab.key === menuItem.key)) {
      setTabs([
        ...tabs,
        { key: menuItem.key, label: menuItem.label, url: menuItem.url },
      ]);
    }

    setActiveTab(menuItem.key);
    setSelectedMenuKeys([key]);

    // 부모 메뉴 openKeys 자동 설정
    const parentKeys = getParentKeys(key, [...basicItems, ...adminItems]);
    // setOpenKeys(parentKeys ? [...parentKeys] : []);

    router.push(menuItem.url, undefined, { shallow: true });
  };

  // 📌 key 값으로 3-depth까지 메뉴 찾기
  const findMenuItemByKey = (menuList, key) => {
    for (const item of menuList) {
      if (item.key === key) return item;
      if (item.children) {
        const found = findMenuItemByKey(item.children, key);
        if (found) return found;
      }
    }
    return null;
  };

  // 📌 url 값으로 3-depth까지 메뉴 찾기
  const findMenuItemByUrl = (menuList, url) => {
    for (const item of menuList) {
      if (item.url === url) return item;
      if (item.children) {
        const found = findMenuItemByUrl(item.children, url);
        if (found) return found;
      }
    }
    return null;
  };

  // 📌 클릭한 메뉴의 부모 key 추적
  const getParentKeys = (key, menuList, parents = []) => {
    for (const item of menuList) {
      if (item.key === key) return parents;
      if (item.children) {
        const found = getParentKeys(key, item.children, [...parents, item.key]);
        if (found) return found;
      }
    }
    return null;
  };

  // 📌 탭 변경 시 GNB 활성화
  const onTabChange = (key) => {
    setActiveTab(key);
    const menuItem = findMenuItemByKey([...basicItems, ...adminItems], key);
    if (menuItem) {
      setSelectedMenuKeys([menuItem.key]);
      const parentKeys = getParentKeys(menuItem.key, [
        ...basicItems,
        ...adminItems,
      ]);
      // setOpenKeys(parentKeys ? [...parentKeys] : []);
    }
    router.push(menuItem.url, undefined, { shallow: true });
  };

  // 📌 탭 닫기
  const onTabRemove = (targetKey) => {
    const targetIndex = tabs.findIndex((tab) => tab.key === targetKey);
    const newTabs = tabs.filter((tab) => tab.key !== targetKey);
  
    let newActiveKey = activeTab;
    let newActiveUrl = "";
  
    if (targetKey === activeTab) {
      const nextTab = tabs[targetIndex + 1] || tabs[targetIndex - 1];
      if (nextTab) {
        newActiveKey = nextTab.key;
        newActiveUrl = nextTab.url;
      } else {
        newActiveKey = "";
        newActiveUrl = "/";
      }
    }

    setTabs(newTabs);
    setActiveTab(newActiveKey);
    router.push(newActiveUrl, undefined, { shallow: true });
    setSelectedMenuKeys([newActiveKey]);
    const parentKeys = getParentKeys(newActiveKey, [
      ...basicItems,
      ...adminItems,
    ]);
    // setOpenKeys(parentKeys ? [...parentKeys] : []);
  };

  // 📌 GNB 서브메뉴 상태 변경
  const onOpenChange = (keys) => {
    setOpenKeys(keys);
  };

  const addTab = (menuItem) => {
    if (!tabs.some((tab) => tab.key === menuItem.key)) {
      setTabs([
        ...tabs,
        { key: menuItem.key, label: menuItem.label, url: menuItem.url },
      ]);
    }
    setActiveTab(menuItem.key);
    router.push(menuItem.url, undefined, { shallow: true });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        const isSmallScreen = window.innerWidth <= 1200;
        setIsMobile(window.innerWidth <= 768);
        setCollapsed(isSmallScreen);
      };

      const updateHeight = () => {
        const header = document.querySelector(".header")?.offsetHeight || 0;
        const contentsTop =
          document.querySelector(".contents-top")?.offsetHeight || 0;
        const pageNav =
          document.querySelector(".page-top-nav > .ant-tabs-nav")
            ?.offsetHeight || 0;

        setContentHeight(`calc(${contentsTop}px + ${pageNav}px)`);
      };

      // 페이지 이동 시 높이 업데이트
      const handleRouteChange = () => {
        setTimeout(updateHeight, 50); // 약간의 딜레이를 줘서 정확한 값 적용
      };

      updateHeight(); // 초기 높이 설정
      handleResize(); // 초기 화면 크기 설정

      window.addEventListener("resize", handleResize);
      router.events.on("routeChangeComplete", handleRouteChange); // 페이지 변경 감지

      return () => {
        window.removeEventListener("resize", handleResize);
        router.events.off("routeChangeComplete", handleRouteChange); // 이벤트 해제
      };
    }
  }, [router.events]);

  useEffect(() => {
  
    requestIdleCallback(() => {
      startTransition(() => {
        if (!router.isReady) return;

        setTimeout(() => {
          const { pathname } = router;
          
          const menuItem = findMenuItemByUrl([...basicItems, ...adminItems], pathname);
          if (menuItem) {
            if (!tabs.some((tab) => tab.key === menuItem.key)) {
              const newTabs = [...tabs, {
                key: menuItem.key,
                label: menuItem.label,
                url: menuItem.url
              }];
              setTabs(newTabs);
            }
          
            setActiveTab(menuItem.key);
            setSelectedMenuKeys([menuItem.key]);
          }
        }, 50); // 약간의 딜레이를 줘서 정확한 값 적용
      });
    });
  }, [router.pathname]);

  return (
    <TabContext.Provider value={{ tabs, activeTab, addTab }}>
      <Layout style={{ height: '100vh' }}>
        <Layout>
          {/* GNB (왼쪽 메뉴) */}
          <Sider
            className="lnb-area"
            trigger={null}
            collapsible
            collapsed={collapsed}
            breakpoint="lg"
            width={260}
            collapsedWidth={64}
          >
            <div className="lnb-top">
              {/* 로고 */}
              <div
                className="logo"
                style={{
                  opacity: collapsed ? 0 : 1,
                  display: collapsed ? "none" : "block",
                }}
              >
                <img src={"/images/logo.svg"} />
                FabTable
              </div>

              {/* 햄버거 버튼 */}
              <Button
                type="text"
                icon={<MenuFoldOutlined />}
                onClick={() =>
                  isMobile ? setDrawerVisible(true) : setCollapsed(!collapsed)
                }
                style={{
                  marginRight: collapsed || isMobile ? "0" : "8px",
                }}
                className="btn-menu"
              />
            </div>

            <div
              className="user-info"
              style={{
                opacity: collapsed ? 0 : 1,
                display: collapsed ? "none" : "block",
              }}
            >
              <Tag className="blue">품질팀</Tag>

              {/*
								<Tag className="pink">영업팀</Tag>
								<Tag className="orange">생산팀</Tag>
								<Tag className="purple">부서4</Tag>
								<Tag className="red">부서5</Tag>
								<Tag className="green">부서6</Tag>
								*/}

              <span className="name">
								<Link href={"/publish/"}>홍길동 님</Link>
							</span>
            </div>

            <div className="lnb-scroll">
              <p
                className="tit-menu"
                style={{
                  opacity: collapsed ? 0 : 1,
                  display: collapsed ? "none" : "block",
                }}
              >
                일반 업무
              </p>

              <Menu
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={openKeys}
                mode="inline"
                items={basicItems}
                selectedKeys={selectedMenuKeys}
                // openKeys={openKeys}
                // onOpenChange={onOpenChange}
                inlineIndent="10"
                onClick={handleMenuClick}
              />

              <div className="set-menu-area">
                <p
                  className="tit-menu"
                  style={{
                    opacity: collapsed ? 0 : 1,
                    display: collapsed ? "none" : "block",
                  }}
                >
                  관리 및 설정
                </p>

                <Menu
                  mode="inline"
                  items={adminItems}
                  selectedKeys={selectedMenuKeys}
                  openKeys={openKeys}
                  onOpenChange={onOpenChange}
                  inlineIndent="10"
                  onClick={handleMenuClick}
                />
              </div>
            </div>

            <Button
              icon={<QuestionCircleFilled />}
              type="text"
              className="btn-help"
            >
							<span
                style={{
                  opacity: collapsed ? 0 : 1,
                  display: collapsed ? "none" : "inline",
                }}
              >
								도움말
							</span>
            </Button>
          </Sider>

          {/* 오른쪽 본문 컨텐츠 */}
          <Layout
            style={{
              transition: "margin-left 0.2s ease-in-out",
            }}
            className={`${collapsed ? "collapsed-mode" : "expanded-mode"}`}
          >
            <Header className="header">
              <div
                className="header-wrap"
                style={{
                  transition: "margin-left 0.2s ease-in-out",
                }}
              >
                <DateHeader />

                <p className="time">
                  <ClockCircleOutlined />
                  00:00:00
                </p>

                <Menu mode="horizontal" items={topItems} className="top-menu" />
              </div>
            </Header>
            {/* 탭 없이 하려면 아래 코드를 적용 */}
            {/* <Content className="contents" style={{ overflowY: "auto"}}>
              {children ? React.cloneElement(children, { contentHeight }) : null}
            </Content> */}
            {/* 탭 적용하려면 아래 코드를 적용 */}
            {/* Content 영역을 Tabs로 변경 */}
            <Content className="contents">
              <Tabs
                hideAdd
                size="small"
                type="editable-card"
                activeKey={activeTab}
                onChange={onTabChange}
                onEdit={(targetKey, action) =>
                  action === "remove" && onTabRemove(targetKey)
                }
                className="page-top-nav"
                // style={{ height: "100%"}}
              >
                {console.log("tabs", tabs) || tabs.map((tab) => (
                  <Tabs.TabPane
                    tab={tab.label}
                    key={tab.key}
                    closable={tab.key !== "1"}
                    style={{ height: "100%" }}
                  >
                    <Suspense
                      fallback={
                        <div style={{ padding: 24 }}>
                          <Skeleton active paragraph={{ rows: 10 }} />
                        </div>
                      }
                    >
                      {pageComponents[tab.url] ? (
                        React.createElement(pageComponents[tab.url], {
                          contentHeight,
                          activeTab,
                          //현재 탭이 열려잇는지 여부
                          activeKey: tab.key,
                          isActive: tab.key === activeTab
                        })
                      ) : (
                        <div>페이지 없음</div>
                      )}
                    </Suspense>
                  </Tabs.TabPane>
                ))}
              </Tabs>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </TabContext.Provider>
  );
};

export default HomePage;
