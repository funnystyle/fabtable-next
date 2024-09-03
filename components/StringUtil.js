export const getPage = (url) => {
  const queryString = url.split('?')[1]; // 'page=2'

  if (!queryString) {
    return 1;
  }

  const queryParams = queryString.split('&');
  let p = 1;
  for (const param of queryParams) {
    const [key, value] = param.split('='); // 'page=2' -> ['page', '2']
    if (key === 'page') {
      p = value; // '2'
      break; // 'page' 파라미터를 찾았으므로 반복 종료
    }
  }

  return p;
}
