// import React, { useState, useEffect } from 'react';
// import Modal from 'react-modal';

// Modal.setAppElement('#__next'); // Next.js 접근성 설정

// const LayerPopup = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [openTime, setOpenTime] = useState(null);
//   const [closeTime, setCloseTime] = useState(null);

//   useEffect(() => {
//     // 로컬 스토리지에서 열린 시간과 닫힌 시간 불러오기
//     const savedOpenTime = localStorage.getItem('openTime');
//     const savedCloseTime = localStorage.getItem('closeTime');

//     if (savedOpenTime) {
//       setOpenTime(savedOpenTime);
//     }
//     if (savedCloseTime) {
//       setCloseTime(savedCloseTime);
//     }
//   }, []);

//   const handleOpen = () => {
//     const currentTime = new Date().toLocaleTimeString();
//     setOpenTime(currentTime);
//     localStorage.setItem('openTime', currentTime); // 열린 시간 로컬 스토리지에 저장
//     setIsOpen(true);
//   };

//   const handleClose = () => {
//     const currentTime = new Date().toLocaleTimeString();
//     setCloseTime(currentTime);
//     localStorage.setItem('closeTime', currentTime); // 닫힌 시간 로컬 스토리지에 저장
//     setIsOpen(false);
//   };

//   return (
//       <div className="row">
//         <button onClick={handleOpen}>Open Popup</button>
//         <Modal
//             isOpen={isOpen}
//             onRequestClose={handleClose}
//             contentLabel="Example Layer Popup"
//             style={{
//               content: {
//                 top: '50%',
//                 left: '50%',
//                 right: 'auto',
//                 bottom: 'auto',
//                 marginRight: '-50%',
//                 transform: 'translate(-50%, -50%)',
//                 width: '50%',
//               },
//             }}
//         >
//           <h2>레이어 팝업</h2>
//           <table>
//             <thead>
//             <tr>
//               <th>Name</th>
//               <th>Position</th>
//             </tr>
//             </thead>
//             <tbody>
//             <tr>
//               <td>John</td>
//               <td>Developer</td>
//             </tr>
//             <tr>
//               <td>Jane</td>
//               <td>Designer</td>
//             </tr>
//             </tbody>
//           </table>
//           <button onClick={handleClose}>Close</button>
//         </Modal>

//         <div>
//           <p>열린 시간: {openTime ? openTime : "팝업이 열리지 않았습니다."}</p>
//           <p>닫힌 시간: {closeTime ? closeTime : "팝업이 닫히지 않았습니다."}</p>
//         </div>
//       </div>
//   );
// };

// export default LayerPopup;
