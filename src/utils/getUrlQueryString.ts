export default function getUrlQueryString (url: any) {
  let pathName = url.split('?')[1]
  const obj: any = {}
  if (!pathName) {
    return obj
  }
  // 转换为对象
  const searArr = pathName.split('&')
  searArr.forEach((item: any) => {
    let index = item.indexOf('=')
    const arr = item.split('=')
    // obj[arr[0]] = arr[1]
    obj[arr[0]] = item.substring(index + 1)
  })
  return obj
}
