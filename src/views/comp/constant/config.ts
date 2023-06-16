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
    title: "组件",
    children: [{ title: "信息反馈", path: "/demo/message" }],
  },
  {
    title: "示例",
    children: [
      { title: "vue3使用示例", path: "/demo/example" },
      { title: "pinia使用示例", path: "/demo/example/pinia" },
    ],
  },
  {
    title: "拓展",
    children: [{ title: "自定义指令", path: "/demo/custom" }],
  },
];
