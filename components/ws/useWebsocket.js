import { useEffect, useRef } from "react";

/**
 * stompClient는 외부에서 생성된 전역 STOMP 클라이언트라고 가정
 * 예: const stompClient = new Stomp.Client({...});
 */
import { stompClient } from "@lib/socket";

/**
 * topic: 구독할 STOMP topic (예: "/topic/orderInfoCreate")
 * onMessage: 메시지 수신 시 실행할 콜백 함수
 */
export const useWebsocket = (topic, onMessage) => {
  const subscribedRef = useRef(false);

  useEffect(() => {
    if (!stompClient) return;

    stompClient.onConnect = () => {
      console.log("🔌 STOMP 연결됨");

      if (!subscribedRef.current) {
        stompClient.subscribe(topic, onMessage);
        subscribedRef.current = true;
        console.log(`📡 ${topic} 구독 완료`);
      }
    };

    if (!stompClient.active) {
      stompClient.activate();
    }

    return () => {
      console.log("🛑 컴포넌트 언마운트 - STOMP 종료 예정");
      stompClient.deactivate();
      subscribedRef.current = false;
    };
  }, []); // ✅ 딱 1번만 실행
};
