import { MockMethod } from "vite-plugin-mock";
const baseUrl = "/api/mock/example";
export default [
  {
    url: `${baseUrl}/loadList`,
    method: "post",
    response: (res) => {
      const { pageNum, pageSize } = res.body;
      const total = 85;
      const preNum = (pageNum - 1) * pageSize;

      let size = pageSize;

      if (preNum + pageSize > total) {
        size = total - preNum;
      }

      const result = {
        items: [...new Array(size)].map((_x, n) => n + preNum),
        total,
      };
      return {
        code: 20000,
        result,
        message: "登录成功",
      };
    },
  },
] as MockMethod[];
