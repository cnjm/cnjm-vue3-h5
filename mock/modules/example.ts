import { MockMethod } from "vite-plugin-mock";
const baseUrl = "/api/mock/example";
export default [
  {
    url: `${baseUrl}/loadList`,
    method: "post",
    response: (res) => {
      const { pageNum, pageSize, name } = res.body;
      const total = name === "无数据" ? 0 : 85;
      const preNum = (pageNum - 1) * pageSize;

      let code = 20000;

      if (name === "错误") {
        code = Math.floor(Math.random() * 10 + 1) > 7 ? 0 : 20000;
      }

      let size = pageSize;

      if (preNum + pageSize > total) {
        size = total - preNum;
      }

      const result = {
        items: [...new Array(size)].map((_x, n) => name + ":" + (n + preNum)),
        total,
      };
      return {
        code,
        result,
        message: "ok",
      };
    },
  },
] as MockMethod[];
