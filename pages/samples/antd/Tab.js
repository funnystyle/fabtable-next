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

  // 기존 이벤트 핸들러를 감싸서 추가 작업을 처리
  const handlePointerDown = (event) => {
    if (onCloseArea(event.target)) {
      onTabClose(tab.key);
    } else if (listeners.onPointerDown) {
      listeners.onPointerDown(event);
    }
  };

  const handleKeyDown = (event) => {
    if (onCloseArea(event.target)) {
      onTabClose(tab.key);
    } else if (listeners.onKeyDown) {
      listeners.onKeyDown(event);
    }
  };

  const onCloseArea = (target) => {
    return target instanceof SVGElement || target instanceof SVGPathElement;
  }

  const modifiedListeners = {
    ...listeners,
    onPointerDown: handlePointerDown,
    onKeyDown: handleKeyDown,
  };

  return (
    <div
        ref={setNodeRef}
        key={tab.key}
        style={style}
        {...attributes}

      >
      <Tabs
        type="editable-card"
        activeKey={activeKey}
        hideAdd
        tabBarStyle={{
          borderBottom: '1px solid #f0f0f0',
        }}
        {...modifiedListeners}
      >
        <TabPane tab={tab.label} key={tab.key} closable />
      </Tabs>
    </div>
  );
}