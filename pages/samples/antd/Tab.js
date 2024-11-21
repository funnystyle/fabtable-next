import React from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import { Tabs } from "antd";
import useActiveKeyStore from "@store/useActiveKeyStore";

const { TabPane } = Tabs;

export function Tab({tab, onTabClose}) {

  const {activeKey, setActiveKey} = useActiveKeyStore();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id:tab.key});

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
        ref={setNodeRef}
        key={tab.key}
        style={style}
        {...attributes} {...listeners}

      >
      <Tabs
        type="card"
        activeKey={activeKey}
        onEdit={(targetKey, action) => {
          if (action === 'remove') {
            onTabClose(targetKey);
          }
        }}
        hideAdd
        tabBarStyle={{
          borderBottom: '1px solid #f0f0f0',
        }}
      >
        <TabPane tab={tab.label} key={tab.key} closable />
      </Tabs>
    </div>
  );
}