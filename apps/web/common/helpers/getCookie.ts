function getCookie(name: string, cookie: string) {
  const value = cookie
  const parts = value.split(`; `)
  const keyValue = parts.find((item: string) => item.includes(name))
  return keyValue?.replace(`${name}=`, "")
}

export default getCookie
