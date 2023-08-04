// 路径转为大驼峰
export function srcToUpperCase(src: string) {
  return src
    .split("/")
    .map((n) => n.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase()))
    .join("");
}
