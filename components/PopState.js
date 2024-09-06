export const popStatePush = (table, currentPage, router) => () => {
  const pageInfo = table.page.info();
  const newPage = pageInfo.page + 1;

  if (currentPage.current === newPage) return;
  currentPage.current = newPage;

  router.push(
    {
      pathname: router.pathname,
      query: { ...router.query, page: newPage },
    },
    undefined,
    { shallow: true }
  );
}

// popstate 이벤트 핸들러
export const handlePopState = (table, window) => () => {
  const params = new URLSearchParams(window.location.search);
  const page = parseInt(params.get("page"), 10) || 1;

  table.page(page - 1).draw(false); // DataTable에서 특정 페이지로 이동
};