// pages/user.js
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import useBoardStore from "../store/useBoardStore"; // 변경된 이름으로 import

const fetchBoards = async () => {
  const response = await apiClient.get("/user/board");
  return response.data;
};

const BoardPage = () => {
  const setBoardList = useBoardStore((state) => state.setBoardList);
  const boardList = useBoardStore((state) => state.boardList); // boardList 상태를 가져옴

  const [queryKey, setQueryKey] = useState(["boards", Math.random()]); // 변경된 부분
  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey,
    queryFn: fetchBoards,
  });

  useEffect(() => {
    if (isSuccess) {
      setBoardList(data.data.list);
    }
  }, [isSuccess]);

  if (isLoading || !isSuccess) return <div>Loading...</div>;
  if (isError) return <div>Error: {isError.message}</div>;

  return (
    <div>
      <h1>Board List</h1>
      <ul>
        {boardList.map((board) => (
          <li key={board.id}>
            <strong>{board.createName}</strong> - {board.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BoardPage;
