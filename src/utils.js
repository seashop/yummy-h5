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

export const checkEmail = (email) => {
  const reg = new RegExp(
    "^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"
  );
  if (email === "") {
    return false;
  }
  if (reg.test(email)) {
    return false;
  }
  return true;
};

export const checkPhone = (phone) => {
  if (String(phone) === "") return false;
  return /^(0065)\d{8}$/.test(String(phone));
};
