interface childrenType {
  title: string;
  path: string;
}
interface componentType {
  title: string;
  children: Array<childrenType>;
}
export const comList: componentType[] = [
  {
    title: "反馈组件",
    children: [
      { title: "信息提示", path: "/demo/message" },
      { title: "弹出框", path: "/demo/dialog" },
    ],
  },
  {
    title: "拓展",
    children: [{ title: "自定义指令", path: "/demo/custom" }],
  },
];
