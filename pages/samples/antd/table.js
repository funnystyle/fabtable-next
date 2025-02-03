import { Table, Input } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";

const SampleProductTable = () => {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [filters, setFilters] = useState({});
  const [sorter, setSorter] = useState({ field: "id", order: "ascend" });

  useEffect(() => {
    fetchColumns();
    fetchData();
  }, [pagination.current, pagination.pageSize, filters, sorter]);

  // 헤더 데이터 가져오기
  const fetchColumns = async () => {
    try {
      const response = await axios.get("http://localhost:8991/api/sample/products/headers");
      const formattedColumns = response.data.map((col) => ({
        title: col.title,
        dataIndex: col.dataIndex,
        key: col.dataIndex,
        sorter: col.sortable,
        filters: col.filterable ? [] : null,
      }));
      setColumns(formattedColumns);
    } catch (error) {
      console.error(error);
    }
  };

  // 데이터 가져오기
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8991/api/sample/products/data", {
        params: {
          category: filters.category || "",
          page: pagination.current - 1,
          size: pagination.pageSize,
          sortBy: sorter.field,
          direction: sorter.order === "ascend" ? "asc" : "desc",
        },
      });

      setData(response.data.content);
      setPagination({
        ...pagination,
        total: response.data.totalElements,
      });
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setPagination(pagination);
    setSorter({
      field: sorter.field || "id",
      order: sorter.order || "ascend",
    });
    setFilters(filters);
  };

  return (
    <div>
      <Input.Search
        placeholder="Filter by category"
        onSearch={(value) => setFilters({ category: value })}
        style={{ marginBottom: 16, width: 200 }}
      />
      <Table
        columns={columns}
        rowKey="id"
        dataSource={data}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default SampleProductTable;
