const DataTablesHeader = ({ header, columns }) => {

  return (
    <thead>
    {header.map((row, rowIndex) => (
      <tr key={`header-row-${rowIndex}`}>
        {row.map((col, colIndex) => (
          <th
            key={`header-col-${rowIndex}-${colIndex}`}
            colSpan={col.colspan || 1}
            rowSpan={col.rowspan || 1}
            data-dt-order={rowIndex  + (col.rowspan || 1) === header.length ? undefined : "disable"}
          >
            {col.title}
          </th>
        ))}
      </tr>
    ))}
    </thead>
  );
};

export default DataTablesHeader;
