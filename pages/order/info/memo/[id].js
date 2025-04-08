// pages/product_memo.js
import React, { useEffect, useState } from "react";
import { Button, Flex, Form, Input, Spin, Typography } from "antd";
import { useRouter } from "next/router";
import { useGetRecordDetail } from "@components/api/useGetRecordDetail";
import OrderTotalPopupTitle from "@components/popup/order/OrderTotalPopupTitle";
import { useSetRecordMemo } from "@components/api/useSetRecordMemo";

const { TextArea } = Input;
const { Title } = Typography;

const ProduceMemoComponent = () => {
  useEffect(() => {
    document.documentElement.classList.add("f-html");
    document.body.classList.add("f-body");

    // Cleanup: 페이지가 변경될 때 클래스 제거
    return () => {
      document.documentElement.classList.remove("f-html");
      document.body.classList.remove("f-body");
    };
  }, []);

  const router = useRouter();
  const { id } = router.query; // <- 여기서 id 값을 받음
  const { data, isLoading } = useGetRecordDetail(id);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, data]);

  const { recordMemoUpdate } = useSetRecordMemo();

  // 메모 저장
  const [salesTeamMemo, setSalesTeamMemo] = useState("");
  const [produceTeamMemo, setProduceTeamMemo] = useState("");
  const [qcTeamMemo, setQcTeamMemo] = useState("");

  const onClick = (id, salesTeamMemo, produceTeamMemo, qcTeamMemo) => {
    recordMemoUpdate([id], salesTeamMemo, produceTeamMemo, qcTeamMemo);
  }

  useEffect(() => {
    if (data) {
      setSalesTeamMemo(data.salesTeamMemo || "");
      setProduceTeamMemo(data.produceTeamMemo || "");
      setQcTeamMemo(data.qcTeamMemo || "");
    }
  }, [data]);

  const handleClose = () => {
    window.close();
  }

  return (
    <Spin spinning={loading} style={{ textAlign: "center" }}>
      <div className="system-popup-wrap memo">
        <OrderTotalPopupTitle title={"부서별 메모"} data={data} />

        <div className="popup-contents">
          <div className="order-info-wrap memo">
            <Form.Item label="영업팀 메모">
              <TextArea rows={5} style={{ resize: "none" }} value={salesTeamMemo} onChange={(e) => setSalesTeamMemo(e.target.value)} />
            </Form.Item>

            <Form.Item label="생산팀 메모">
              <TextArea rows={5} style={{ resize: "none" }} value={produceTeamMemo} onChange={(e) => setProduceTeamMemo(e.target.value)} />
            </Form.Item>

            <Form.Item label="품질팀 메모">
              <TextArea rows={5} style={{ resize: "none" }} value={qcTeamMemo} onChange={(e) => setQcTeamMemo(e.target.value)} />
            </Form.Item>
          </div>

          <Flex gap={8} justify="center" align="center" className="popup-f-btn">
            <Button
              onClick={handleClose}
            >닫기</Button>
            <Button type="primary"
                    onClick={() => onClick(data?.id, salesTeamMemo, produceTeamMemo, qcTeamMemo)}
            >저장</Button>
          </Flex>
        </div>
      </div>
    </Spin>
  );
};

ProduceMemoComponent.getLayout = (page) => page;

export default ProduceMemoComponent;
