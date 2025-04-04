// lib/socket.js
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export const stompClient = new Client({
  webSocketFactory: () => new SockJS(`${process.env.NEXT_PUBLIC_API_BASE_URL}/ws`),
  reconnectDelay: 5000,
  debug: (str) => console.log("STOMP:", str),
});
