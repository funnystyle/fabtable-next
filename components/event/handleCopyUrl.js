import { message } from "antd";

export const handleCopyUrl = () => {
  navigator.clipboard.writeText(window.location.href);
  message.success("URL이 복사되었습니다.");
}