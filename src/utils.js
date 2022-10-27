export const getUrlParams = () => {
  const search = window.location.search.substring(1);
  const list = search.split("&");
  const result = list.reduce((total, cur) => {
    const key = cur.split("=")[0];
    const value = cur.split("=")[1];
    total[key] = value;
    return total;
  }, {});
  return result;
};
