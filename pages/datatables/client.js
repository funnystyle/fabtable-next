// pages/user.js
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import apiClient from "../../api/apiClient";
import DataTables from "../../components/DataTables";
import data from "../../data/datatables/client/data";

const columns = [
  { title: "Name" },
  { title: "Position" },
  { title: "Office" },
  { title: "Extn." },
  { title: "Start data" },
  { title: "Salary" },
];

const DataTablePage = () => {
  return (
    <div>
      <h1>DataTables Sample (Client)</h1>
      <DataTables data={data} columns={columns} />
    </div>
  );
};

export default DataTablePage;
