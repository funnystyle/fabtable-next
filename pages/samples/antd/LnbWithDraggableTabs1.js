import React, { useState } from 'react';
import { Layout, Menu, Tabs } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates, horizontalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { Tab } from "@pages/samples/antd/Tab";
import useActiveKeyStore from "@store/useActiveKeyStore";

const { Sider, Content } = Layout;
const { TabPane } = Tabs;

const LnbWithDraggableTabs1 = () => {
  const {activeKey, setActiveKey} = useActiveKeyStore();

  // LNB에 표시될 메뉴 항목 정의
  const menuItems = [
    { key: '1', label: 'Dashboard', content: <div>Dashboard Content</div> },
    { key: '2', label: 'Profile', content: <div>Profile Content</div> },
    { key: '3', label: 'Settings', content: <div>Settings Content</div> },
    // 4~ 50
    { key: '4', label: 'MenuMenuMenuMenu 4', content: <div>Menu 4 Content</div> },
    { key: '5', label: 'MenuMenuMenuMenu 5', content: <div>Menu 5 Content</div> },
    { key: '6', label: 'MenuMenuMenuMenu 6', content: <div>Menu 6 Content</div> },
    { key: '7', label: 'MenuMenuMenuMenu 7', content: <div>Menu 7 Content</div> },
    { key: '8', label: 'MenuMenuMenuMenu 8', content: <div>Menu 8 Content</div> },
    { key: '9', label: 'MenuMenuMenuMenu 9', content: <div>Menu 9 Content</div> },
    { key: '10', label: 'MenuMenuMenuMenu 10', content: <div>Menu 10 Content</div> },
    { key: '11', label: 'MenuMenuMenuMenu 11', content: <div>Menu 11 Content</div> },
    { key: '12', label: 'MenuMenuMenuMenu 12', content: <div>Menu 12 Content</div> },
    { key: '13', label: 'MenuMenuMenuMenu 13', content: <div>Menu 13 Content</div> },
    { key: '14', label: 'MenuMenuMenuMenu 14', content: <div>Menu 14 Content</div> },
    { key: '15', label: 'MenuMenuMenuMenu 15', content: <div>Menu 15 Content</div> },
    { key: '16', label: 'MenuMenuMenuMenu 16', content: <div>Menu 16 Content</div> },
    { key: '17', label: 'MenuMenuMenuMenu 17', content: <div>Menu 17 Content</div> },
    { key: '18', label: 'MenuMenuMenuMenu 18', content: <div>Menu 18 Content</div> },
    { key: '19', label: 'MenuMenuMenuMenu 19', content: <div>Menu 19 Content</div> },
    { key: '20', label: 'MenuMenuMenuMenu 20', content: <div>Menu 20 Content</div> },
    { key: '21', label: 'MenuMenuMenuMenu 21', content: <div>Menu 21 Content</div> },
    { key: '22', label: 'MenuMenuMenuMenu 22', content: <div>Menu 22 Content</div> },
    { key: '23', label: 'MenuMenuMenuMenu 23', content: <div>Menu 23 Content</div> },
    { key: '24', label: 'MenuMenuMenuMenu 24', content: <div>Menu 24 Content</div> },
    { key: '25', label: 'MenuMenuMenuMenu 25', content: <div>Menu 25 Content</div> },
    { key: '26', label: 'MenuMenuMenuMenu 26', content: <div>Menu 26 Content</div> },
    { key: '27', label: 'MenuMenuMenuMenu 27', content: <div>Menu 27 Content</div> },
    { key: '28', label: 'MenuMenuMenuMenu 28', content: <div>Menu 28 Content</div> },
    { key: '29', label: 'MenuMenuMenuMenu 29', content: <div>Menu 29 Content</div> },
    { key: '30', label: 'MenuMenuMenuMenu 30', content: <div>Menu 30 Content</div> },
  ];

  const [tabs, setTabs] = useState([]); // 탭 데이터를 상태로 관리

  // LNB 메뉴 클릭 시 호출되는 이벤트 핸들러
  const handleMenuClick = ({ key }) => {
    const selectedItem = menuItems.find((item) => item.key === key);
    if (!tabs.find((tab) => tab.key === key)) {
      setTabs([...tabs, selectedItem]); // 새로운 탭을 추가하고 상태를 업데이트
    }
    setActiveKey(key); // 활성화된 탭의 키 업데이트
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

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event) {
    const {active, over} = event;

    if (active && over && active.id === over.id) {
      setActiveKey(active.id);
    }

    if (active && over && active.id !== over.id) {
      const overIndex = tabs.findIndex((tab) => tab.key === over.id);
      const activeIndex = tabs.findIndex((tab) => tab.key === active.id);
      const nextTabs = [...tabs];
      nextTabs.splice(overIndex, 0, nextTabs.splice(activeIndex, 1)[0]);

      setTabs(nextTabs);
    }
  }

  return (
    <Layout style={{ height: '100vh'}}>
      {/* LNB 사이드바 렌더링 */}
      <Sider width={200}>
        <Menu mode="inline" onClick={handleMenuClick} items={menuItems.map((item) => ({
          key: item.key,
          label: item.label,
        }))} />
      </Sider>

      {/* 콘텐츠 영역 */}
      <Layout>
        <Content style={{ padding: '16px', backgroundColor: "white"  }}>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            {/* Droppable 영역 */}
            <SortableContext
              items={tabs.map((tab) => tab.key)}
              strategy={horizontalListSortingStrategy}
            >
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap', // 넘치는 경우 다음 줄로
                    gap: '4px',
                    overflow: 'visible', // 스크롤 숨김
                  }}
                >
                  {/* Draggable 탭 렌더링 */}
                  {tabs.map((tab, index) => (
                    <Tab key={tab.key} tab={tab} activeKey={activeKey} onTabClose={handleTabClose}  />
                  ))}
                </div>
            </SortableContext>
          </DndContext>
          <div>
            {tabs.length > 0 && tabs.find((tab) => tab.key === activeKey)?.content}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LnbWithDraggableTabs1;
