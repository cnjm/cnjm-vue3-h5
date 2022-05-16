import { createProdMockServer } from "vite-plugin-mock/es/createProdMockServer";
import userMock from "./user";

export function setupProdMockServer() {
  console.log("11111111111111111111111111");
  createProdMockServer([...userMock]);
}
