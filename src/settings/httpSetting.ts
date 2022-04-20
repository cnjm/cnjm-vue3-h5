import { HttpConfig } from "/#/setting";

const httpSetting: HttpConfig = {
  /**
   * 默认接口返回的数据格式为
   * {code,message,result}
   * 具体可以根据自身项目调整配置
   */
  requestCodeName: "code",
  requestMessageName: "message",
  requestResultName: "result",
};

export default httpSetting;
