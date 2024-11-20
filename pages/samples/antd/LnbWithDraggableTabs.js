import React, { useState } from 'react';
import { Layout, Menu, Tabs } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const { Sider, Content } = Layout;
const { TabPane } = Tabs;

const LnbWithDraggableTabs = () => {
  const [activeKey, setActiveKey] = useState(null); // 활성화된 탭의 key 상태

  // LNB에 표시될 메뉴 항목 정의
  const menuItems = [
    { key: '1', label: 'Dashboard', content: <div>Dashboard Content</div> },
    { key: '2', label: 'Profile', content: <div>Profile Content</div> },
    { key: '3', label: 'Settings', content: <div>Settings Content</div> },
  ];

  const [tabs, setTabs] = useState([
    { key: '1', label: 'Dashboard', content: <div>Dashboard Content</div> }
  ]); // 탭 데이터를 상태로 관리

  // LNB 메뉴 클릭 시 호출되는 이벤트 핸들러
  const handleMenuClick = ({ key }) => {
    const selectedItem = menuItems.find((item) => item.key === key);
    if (!tabs.find((tab) => tab.key === key)) {
      setTabs([...tabs, selectedItem]); // 새로운 탭을 추가하고 상태를 업데이트
    }
    setActiveKey(key); // 활성화된 탭의 키 업데이트
  };

  // 탭 전환 시 호출되는 이벤트 핸들러
  const handleTabChange = (key) => {
    setActiveKey(key); // 활성화된 탭의 key 업데이트
  };

  // 탭 닫기 버튼 클릭 시 호출되는 이벤트 핸들러
  const handleTabClose = (targetKey) => {
    const filteredTabs = tabs.filter((tab) => tab.key !== targetKey); // 닫힌 탭 제외
    setTabs(filteredTabs); // 상태 업데이트
    if (filteredTabs.length > 0) {
      setActiveKey(filteredTabs[0].key); // 첫 번째 탭을 활성화
    } else {
      setActiveKey(null); // 모든 탭이 닫히면 비활성화
    }
  };

  return (
    <Layout style={{ height: '100vh' }}>
      {/* LNB 사이드바 렌더링 */}
      <Sider width={200}>
        <Menu mode="inline" onClick={handleMenuClick} items={menuItems.map((item) => ({
          key: item.key,
          label: item.label,
        }))} />
      </Sider>

      {/* 콘텐츠 영역 */}
      <Layout>
        <Content style={{ padding: '16px' }}>
          <DragDropContext
            onDragEnd={(result) => {
              const { source, destination } = result;
              if (!destination) return;
              if (destination.index === 0) {
                destination.index = 1;
              }
              const updatedTabs = Array.from(tabs);
              const [movedTab] = updatedTabs.splice(source.index, 1);
              updatedTabs.splice(destination.index, 0, movedTab);
              setTabs(updatedTabs);
            }}
          >
            {/* Droppable 영역 */}
            <Droppable droppableId="tabs" direction="horizontal" type="TAB">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    display: 'flex',
                    overflowX: 'auto',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {/* Draggable 탭 렌더링 */}
                  {tabs.map((tab, index) => (
                    <Draggable key={tab.key} draggableId={tab.key} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            display: 'inline-block',
                            margin: '0 4px',
                            borderRadius: '4px',
                            ...provided.draggableProps.style,
                          }}
                        >
                          {/* TabPane을 드래그 가능하게 설정 */}
                          <Tabs
                            type={tab.key==1 ? "card": "editable-card"}
                            activeKey={activeKey}
                            onChange={handleTabChange}
                            onEdit={(targetKey, action) => {
                              if (action === 'remove') {
                                handleTabClose(targetKey);
                              }
                            }}
                            hideAdd
                          >
                            <TabPane tab={tab.label} key={tab.key} closable />
                          </Tabs>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder} {/* 드래그 시 공간 확보 */}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <div>
            {tabs.length > 0 && tabs[activeKey - 1] && tabs[activeKey - 1].content}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LnbWithDraggableTabs;
