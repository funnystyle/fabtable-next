import React, { useState } from 'react';
import { Layout, Menu, Tabs } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;
const { TabPane } = Tabs;

const AdminLayout = () => {
  const [activeKey, setActiveKey] = useState(''); // Currently active tab key
  const [tabs, setTabs] = useState([]); // List of open tabs

  const handleMenuClick = ({ key }) => {
    const existingTab = tabs.find((tab) => tab.key === key);
    if (existingTab) {
      setActiveKey(key); // Switch to the existing tab
    } else {
      const newTab = {
        title: `Menu ${key}`, // Customize tab title per menu
        key,
        content: <div>Content for {key}</div>,
      };
      setTabs([...tabs, newTab]);
      setActiveKey(key); // Switch to the newly created tab
    }
  };

  const removeTab = (targetKey) => {
    const newTabs = tabs.filter((tab) => tab.key !== targetKey);
    setTabs(newTabs);

    if (activeKey === targetKey && newTabs.length) {
      setActiveKey(newTabs[0].key); // Set the first tab as active if the active one is closed
    }
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <Header>
        <Menu mode="horizontal" onClick={handleMenuClick}>
          <Menu.Item key="1">Menu 1</Menu.Item>
          <Menu.Item key="2">Menu 2</Menu.Item>
          <Menu.Item key="3">Menu 3</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '16px' }}>
        <Tabs
          activeKey={activeKey}
          onChange={setActiveKey}
          type="editable-card"
          hideAdd
          onEdit={(targetKey, action) => {
            if (action === 'remove') removeTab(targetKey);
          }}
        >
          {tabs.map((tab) => (
            <TabPane
              tab={
                <span>
                  {tab.title}
                  <CloseOutlined onClick={() => removeTab(tab.key)} />
                </span>
              }
              key={tab.key}
              closable
            >
              {tab.content}
            </TabPane>
          ))}
        </Tabs>
      </Content>
    </Layout>
  );
};

export default AdminLayout;
