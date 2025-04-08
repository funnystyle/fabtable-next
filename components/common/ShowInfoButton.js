// pages/order/create/index.js
import React from "react";
import { Button, Dropdown, message, Space, } from "antd";
import { DownOutlined, RedoOutlined } from "@ant-design/icons";
import { handleOpenPopup, handleRecordInfoMemoPopup, handleRecordInfoPopup } from "@components/popup/handleOpenPopup";
import useRecordDataStore from "@store/useRecordDataStore";


const openPopup = ({
  url = '/',
  name = 'popupWindow',
  width = 1280,
  height = 1120,
  resizable = 'yes',
  scrollbars = 'yes',
}) => {
  const screenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
  const screenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;
  const screenWidth = window.screen.availWidth;
  const screenHeight = window.screen.availHeight;

  const left = screenLeft + (screenWidth - width) / 2;
  const top = screenTop + (screenHeight - height) / 2;

  const features = `width=${width},height=${height},top=${top},left=${left},resizable=${resizable},scrollbars=${scrollbars}`;

  window.open(url, name, features);
};
// const handlePopupOpen = () => {
//   const popupWidth = 520;
//   const popupHeight = 600;

//   const dualScreenLeft = window.screenLeft ?? window.screenX;
//   const dualScreenTop = window.screenTop ?? window.screenY;

//   const screenWidth = window.innerWidth ?? document.documentElement.clientWidth ?? screen.width;
//   const screenHeight = window.innerHeight ?? document.documentElement.clientHeight ?? screen.height;

//   const left = screenWidth / 2 - popupWidth / 2 + dualScreenLeft;
//   const top = screenHeight / 2 - popupHeight / 2 + dualScreenTop;

//   window.open(
//     "/publish/produce_memo", // URL
//     "부서별 메모",    // 팝업 이름
//     `width=${popupWidth},height=${popupHeight},top=${top},left=${left},resizable=yes,scrollbars=yes`
//   );
// };

const viewInfoItems = [
	{
		label: "수주 종합정보",
		key: "1",
	},
	{
		label: "부적합 이력",
		key: "2",
	},
	{
		label: "제어계수 정보",
		key: "3",
	},
	{
		label: "비율제어 정보",
		key: "4",
	},
	{
		label: "부서별 메모",
		key: "5",
	},
];

const handleMenuClick = (e, datas) => {
	// message.info("Click on menu item.");
	console.log("click", e);

  const key = e.key;
  switch(key) {
    case "1":
      handleRecordInfoPopup(window, datas);
      break;
    case "2":
      openPopup({
        url: "/publish/produce_popup3",
        name: "부적합 이력",
        width: 1440,
      });
      break;
    case "3":
      openPopup({
        url: "/publish/produce_popup",
        name: "제어계수 정보",
      });
      break;
    case "4":
      openPopup({
        url: "/publish/produce_ratio_control",
        name: "비율제어 정보",
      });
      break;
    case "5":
      handleRecordInfoMemoPopup(window, datas);
      break;
    default:
      console.log("Unknown option clicked");
  }
};

const ShowInfoButton = ({ keysStore }) => {

  const { datas } = keysStore();

  return (
    // <Button variant="outlined">수주 종합정보</Button>
    <Dropdown menu={{ items: viewInfoItems, onClick: (e) => handleMenuClick(e, datas) }}>
      <Button>
        <Space>
          정보 보기
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  );
};

export default ShowInfoButton;
