import { useEffect, useRef, useState } from "react";
import Sortable from "sortablejs";
import "@css/sortable.css";

const columns = [
  { title: "Name", data: "name" },
  { title: "Position", data: "position" },
  { title: "Office", data: "office" },
  { title: "Extn.", data: "extn" },
  { title: "Start data", data: "startDate" },
  { title: "Salary", data: "salary" },
];

const SortablePage = () => {
  let source = useRef();
  let target = useRef();

  useEffect(() => {
    const sourceSortable = new Sortable(source.current, {
      group: "shared", // set both lists to same group
      animation: 150,
    });
    const targetSortable = new Sortable(target.current, {
      group: "shared",
      animation: 150,
    });
  }, []); //마운트 된 시점

  return (
    <div className="row">
      <div className="list-group col" ref={source}>
        <div className="list-group-item">col1</div>
        <div className="list-group-item">col2</div>
        <div className="list-group-item">col3</div>
        <div className="list-group-item">col4</div>
        <div className="list-group-item">col5</div>
        <div className="list-group-item">col6</div>
        <div className="list-group-item">col7</div>
        <div className="list-group-item">col8</div>
        <div className="list-group-item">col9</div>
        <div className="list-group-item">col10</div>
      </div>
      <div className="list-group col" ref={target}></div>
    </div>
  );
};

export default SortablePage;
