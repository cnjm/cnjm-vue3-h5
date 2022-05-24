import { createProdMockServer } from "vite-plugin-mock/es/createProdMockServer";
import userMock from "./user";

export function setupProdMockServer() {
  createProdMockServer([...userMock]);
}
