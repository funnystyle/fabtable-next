import React, { useState } from 'react';
import { Layout, Tabs, Menu, Button } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const { Sider, Content } = Layout;

const DraggableTabs = () => {
  const [activeKey, setActiveKey] = useState('1');
  const [tabs, setTabs] = useState([
    { key: '1', title: 'Tab 1', content: 'Content of Tab 1' },
  ]);

  // Handle adding or switching to existing tab
  const handleMenuClick = (key) => {
    const existingTab = tabs.find(tab => tab.key === key);
    if (existingTab) {
      setActiveKey(existingTab.key);
    } else {
      const newTab = { key, title: `Tab ${key}`, content: `Content of Tab ${key}` };
      setTabs([...tabs, newTab]);
      setActiveKey(key);
    }
  };

  // Handle removing a tab
  const removeTab = (targetKey) => {
    const newTabs = tabs.filter(tab => tab.key !== targetKey);
    if (newTabs.length) {
      setActiveKey(newTabs[0].key);
    }
    setTabs(newTabs);
  };

  // Handle dragging and reordering tabs
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedTabs = Array.from(tabs);
    const [removed] = reorderedTabs.splice(result.source.index, 1);
    reorderedTabs.splice(result.destination.index, 0, removed);
    setTabs(reorderedTabs);
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider>
        <Menu
          onClick={({ key }) => handleMenuClick(key)}
          items={[
            { key: '2', label: 'Menu 2' },
            { key: '3', label: 'Menu 3' },
          ]}
        />
      </Sider>
      <Layout>
        <Content style={{ padding: '16px' }}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="tabs" direction="horizontal">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{ display: 'flex', alignItems: 'center', overflowX: 'auto' }}
                >
                  {tabs.map((tab, index) => (
                    <Draggable key={tab.key} draggableId={tab.key} index={index}>
                      {(draggableProvided) => (
                        <div
                          ref={draggableProvided.innerRef}
                          {...draggableProvided.draggableProps}
                          {...draggableProvided.dragHandleProps}
                          style={{
                            ...draggableProvided.draggableProps.style,
                            margin: '0 8px',
                            display: 'inline-block'
                          }}
                        >
                          <Tabs
                            activeKey={activeKey}
                            onChange={setActiveKey}
                            type="editable-card"
                            hideAdd
                            onEdit={(targetKey, action) => action === 'remove' && removeTab(targetKey)}
                          >
                            {tabs.map(tab => (
                              <Tabs.TabPane
                                tab={<span>{tab.title}</span>}
                                key={tab.key}
                                closable
                              >
                                {tab.content}
                              </Tabs.TabPane>
                            ))}
                          </Tabs>
                          <Button
                            onClick={() => removeTab(tab.key)}
                            style={{ marginLeft: 4 }}
                          >
                            ×
                          </Button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DraggableTabs;
