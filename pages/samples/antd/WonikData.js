import React, { useState } from 'react';
import { Table, Button, Modal, message } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import CustomEmpty from '@/components/common/CustomEmpty';

const ExcelPasteTable = () => {
  // const [dataSource, setDataSource] = useState([
  //   { key: '1', name: 'John Doe', age: 32, address: 'New York' },
  //   { key: '2', name: 'Jane Doe', age: 28, address: 'Los Angeles' },
  // ]);
  const [dataSource, setDataSource] = useState(
    Array.from({ length: 30 }, (_, i) => ({
      key: (i + 1).toString(),
      name: `User ${i + 1}`,
      age: 20 + (i % 30),
      address: `City ${i + 1}`
    }))
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
  ];

  const copyToClipboard = (excludeHeader = false) => {
    const header = columns.map(col => col.title).join('\t');
    const rows = dataSource.map(row => columns.map(col => row[col.dataIndex]).join('\t'));
    const tsvData = excludeHeader ? rows.join('\n') : [header, ...rows].join('\n');

    navigator.clipboard.writeText(tsvData)
      .then(() => message.success(excludeHeader ? '헤더제외 데이터가 복사되었습니다.' : '헤더포함 데이터가 복사되었습니다.'))
      .catch(() => message.error('복사 실패'));
  };

  return (
    <div>
      <Button type="primary" onClick={() => setIsModalVisible(true)}>
        원익성적서데이터 보기
      </Button>
      <Modal
        title="원익성적서데이터"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        style={{ top: 20 }}
        bodyStyle={{ maxWidth: '80vw', maxHeight: '80vh', overflow: 'auto' }}
      >
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
          <Button icon={<CopyOutlined />} onClick={() => copyToClipboard(false)} style={{ marginRight: 8 }}>
            복사하기(헤더포함)
          </Button>
          <Button icon={<CopyOutlined />} onClick={() => copyToClipboard(true)}>
            복사하기(헤더제외)
          </Button>
        </div>
        <Table 
          dataSource={dataSource} 
          columns={columns} 
          pagination={false} 
          bordered 
          size='small'
          locale={{ emptyText: <CustomEmpty /> }}
        />
      </Modal>
    </div>
  );
};

export default ExcelPasteTable;