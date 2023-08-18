import { createProdMockServer } from "vite-plugin-mock/es/createProdMockServer";

import userMock from "./modules/user";
import exampleMock from "./modules/example";

export function setupProdMockServer() {
  createProdMockServer([...userMock, ...exampleMock]);
}
