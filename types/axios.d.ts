export type ErrorMessageMode = "none" | "dialog" | "toast" | undefined;

export interface RequestOptions {
  // post请求的时候添加参数到url
  joinParamsToUrl?: boolean;
  // 格式化提交参数时间
  formatDate?: boolean;
  // 需要对返回数据进行处理 也就是后端给的code是不是直接返回
  isTransformResponse?: boolean;
  // 是否返回原生响应头 比如：需要获取响应头时使用该属性
  // 例如：当您需要获取响应标头时，请使用此属性
  isReturnNativeResponse?: boolean;
  // 将prefix 添加到url
  joinPrefix?: boolean;
  // 接口地址
  apiUrl?: string;
  // 请求拼接路径
  urlPrefix?: string;
  // mock数据路径有则表示使用
  mockUrl?: string;
  // 错误消息提示类型
  errorMessageMode?: ErrorMessageMode;
  // 是否添加时间戳
  joinTime?: boolean;
  // 忽略取消重复请求标识
  ignoreCancelToken?: boolean;
  // 是否在 header 中携带 token
  withToken?: boolean;
}

// 响应的结构体
export interface Result<T = any> {
  code: number;
  type: "success" | "error" | "warning";
  message: string;
  result: T;
}

// multipart/form-data: upload file
export interface UploadFileParams {
  // Other parameters
  data?: Recordable;
  // File parameter interface field name
  name?: string;
  // file name
  file: File | Blob;
  // file name
  filename?: string;
  [key: string]: any;
}

export interface QiniuTokenParams {
  // Other parameters
  // data?: Recordable;
  // File parameter interface field name
  // name?: string;
  // file name
  // file: File | Blob;
  // file name
  fileName: string;
  path?: string;
  // [key: string]: any;
}
