// numberFormat.js

export function number(num) {
  return new Intl.NumberFormat().format(num);
}

export function decimal(num) {
  return new Intl.NumberFormat("ko-KR", {
    style: "decimal",
  }).format(num);
}

export function percent(num) {
  return (
    new Intl.NumberFormat("ko-KR", {
      style: "decimal",
    }).format(num) + "%"
  );
}
