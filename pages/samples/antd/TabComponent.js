// import React from 'react';
// import {useSortable} from '@dnd-kit/sortable';
// import {CSS} from '@dnd-kit/utilities';
// import { Tabs } from "antd";
// import useActiveKeyStore from "@store/useActiveKeyStore";

// const { TabPane } = Tabs;

// const TabComponent = ({ tab }) => {
//   const {activeKey} = useActiveKeyStore();

//   const {
//     attributes,
//     listeners,
//     setNodeRef,
//     transform,
//     transition,
//   } = useSortable({
//       animateLayoutChanges: ({ isSorting, wasDragging }) => !(isSorting || wasDragging), // 애니메이션 조건 추가
//       id:tab?.key
//   });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   return (
//     <div
//         ref={setNodeRef}
//         key={tab?.key}
//         style={style}
//         {...attributes}

//       >
//       <Tabs
//         type="editable-card"
//         activeKey={activeKey}
//         hideAdd
//         tabBarStyle={{
//           borderBottom: '1px solid #f0f0f0',
//         }}
//         {...listeners}
//       >
//         <TabPane tab={tab?.label} key={tab?.key} closable />
//       </Tabs>
//     </div>
//   );
// }

// export default TabComponent;