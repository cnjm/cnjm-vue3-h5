// axios配置  可自行根据项目进行更改，只需更改该文件即可，其他文件可以不动
import type { AxiosResponse } from "axios";
import type { RequestOptions, Result } from "/#/axios";
import type { AxiosTransform, CreateAxiosOptions } from "./axiosTransform";
import { VAxios } from "./axios";
import { checkStatus } from "./checkStatus";
import { useGlobSetting } from "/@/hooks/setting";
import { RequestEnum, ResultEnum, ContentTypeEnum } from "/@/enums/http.enum";
import { isString } from "/@/utils/internal/isType";
import { setObjToUrlParams, deepMerge } from "/@/utils/util";
import { joinTimestamp, formatRequestDate } from "./helper";
import { useUserStoreWithOut } from "/@/store/modules/user";
const { urlPrefix, apiUrl } = useGlobSetting();

/**
 * @description: 数据处理，方便区分多种处理方式
 */
const transform: AxiosTransform = {
  /**
   * @description: 处理请求数据。如果数据不是预期格式，可直接抛出错误
   */
  transformRequestHook: (res: AxiosResponse<Result>, options: RequestOptions) => {
    const { isTransformResponse, isReturnNativeResponse } = options;
    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
    if (isReturnNativeResponse) {
      return res;
    }
    // 不进行任何处理，直接返回
    // 用于页面代码可能需要直接获取code，data，message这些信息时开启
    if (!isTransformResponse) {
      return res.data;
    }

    // 错误的时候返回
    const { data } = res;
    if (!data) {
      // 请求没有返回值
      throw new Error("请求出错，请稍候重试");
    }

    //  这里 code，result，message为 后台统一的字段，需要在 types.ts内修改为项目自己的接口返回格式
    const { code, result, message } = data;
    // 这里逻辑可以根据项目自行修改
    const hasSuccess = data && Reflect.has(data, "code") && code === ResultEnum.SUCCESS;
    // 条件成立则任务请求数据响应成功
    if (hasSuccess) {
      return result;
    }
    // 在此处根据自己项目的实际情况对不同的code执行不同的操作
    // 如果不希望中断当前请求，请return数据，否则直接抛出异常即可
    let timeoutMsg = "";
    switch (code) {
      case ResultEnum.TIMEOUT:
        timeoutMsg = "登录超时，请重新登录";
        const userStore = useUserStoreWithOut();
        userStore.setToken(undefined);
        userStore.logout(true);
        break;
      default:
        if (message) {
          timeoutMsg = message;
        }
    }

    // errorMessageMode=‘modal’的时候会显示modal错误弹窗，而不是消息提示，用于一些比较重要的错误
    // errorMessageMode='none' 一般是调用时明确表示不希望自动弹出错误提示
    if (options.errorMessageMode === "modal") {
      // createErrorModal({ title: "错误提示", content: timeoutMsg });
    } else if (options.errorMessageMode === "message") {
      // createMessage.error(timeoutMsg);
    }

    throw new Error(timeoutMsg || "请求出错，请稍候重试");
  },

  // 请求之前处理config
  beforeRequestHook: (config, options) => {
    const { apiUrl, joinPrefix, joinParamsToUrl, formatDate, joinTime = true, urlPrefix } = options;
    // 添加api前缀
    if (joinPrefix) {
      config.url = `${urlPrefix}${config.url}`;
    }
    if (apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`;
    }
    const params = config.params || {};
    const data = config.data || false;
    formatDate && data && !isString(data) && formatRequestDate(data);
    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.params = Object.assign(params || {}, joinTimestamp(joinTime, false));
      } else {
        // 兼容restful风格
        config.url = config.url + params + `${joinTimestamp(joinTime, true)}`;
        config.params = undefined;
      }
    } else {
      if (!isString(params)) {
        formatDate && formatRequestDate(params);
        if (Reflect.has(config, "data") && config.data && Object.keys(config.data).length > 0) {
          config.data = data;
          config.params = params;
        } else {
          // 非GET请求如果没有提供data，则将params视为data
          config.data = params;
          config.params = undefined;
        }
        if (joinParamsToUrl) {
          config.url = setObjToUrlParams(config.url as string, Object.assign({}, config.params, config.data));
        }
      } else {
        // 兼容restful风格
        config.url = config.url + params;
        config.params = undefined;
      }
    }
    return config;
  },

  /**
   * @description: 请求拦截器处理
   */
  requestInterceptors: (config, options) => {
    // 请求之前处理config
    const token = "";
    if (token && (config as Recordable)?.requestOptions?.withToken !== false) {
      // jwt token
      (config as Recordable).headers.Authorization = options.authenticationScheme
        ? `${options.authenticationScheme} ${token}`
        : token;
    }
    return config;
  },

  /**
   * @description: 响应拦截器处理
   */
  responseInterceptors: (res: AxiosResponse<any>) => {
    // 默认不做处理
    return res;
  },

  /**
   * @description: 响应错误处理
   */
  responseInterceptorsCatch: (error: any) => {
    const { response, code, message, config } = error || {};
    const errorMessageMode = config?.requestOptions?.errorMessageMode || "none";
    const msg: string = response?.data?.message ?? "";
    const err: string = error?.toString?.() ?? "";
    let errMessage = "";

    try {
      // 如下为用户自身网络问题处理
      if (code === "ECONNABORTED" && message.indexOf("timeout") !== -1) {
        errMessage = "接口请求超时，请刷新页面重试";
      }
      if (err?.includes("Network Error")) {
        errMessage = "网络异常，请检查您的网络连接是否正常！";
      }
      const { createToast } = useMessage();

      if (errMessage) {
        if (errorMessageMode === "modal") {
          // createErrorModal({ title: "错误提示", content: errMessage });
        } else if (errorMessageMode === "message") {
          createToast(errMessage);
        }
        return Promise.reject(error);
      }
    } catch (error) {
      throw new Error(error as unknown as string);
    }
    // 根据不同的错误码处理
    checkStatus(error?.response?.status, msg, errorMessageMode);
    return Promise.reject(error);
  },
};

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new VAxios(
    deepMerge(
      {
        // 授权标头
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes
        // authentication schemes，e.g: Bearer
        authenticationScheme: "",
        // 超时
        timeout: 10 * 1000,
        // 基础接口地址
        // baseURL: globSetting.apiUrl,

        headers: { "Content-Type": ContentTypeEnum.JSON },
        // 如果是form-data格式
        // headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
        // 数据处理方式
        transform,
        // 配置项，下面的选项都可以在独立的接口请求中覆盖
        requestOptions: {
          // 默认将prefix 添加到url
          joinPrefix: true,
          // 是否返回原生响应头 比如：需要获取响应头时使用该属性
          isReturnNativeResponse: false,
          // 需要对返回数据进行处理
          isTransformResponse: true,
          // post请求的时候添加参数到url
          joinParamsToUrl: false,
          // 格式化提交参数时间
          formatDate: true,
          // 错误消息提示类型
          errorMessageMode: "message",
          // 接口地址
          apiUrl,
          // 接口默认前缀拼接地址
          urlPrefix,
          //  是否加入时间戳
          joinTime: true,
          // 忽略取消重复请求标识
          ignoreCancelToken: true,
          // 是否携带token
          withToken: true,
        },
      },
      opt || {},
    ),
  );
}

// 创建axios实例并导出
export const defHttp = createAxios();

// 可以创建更多axios实例，opt会被深度合并
// export const otherHttp = createAxios({
//   requestOptions: {
//     apiUrl: 'xxx',
//     urlPrefix: 'xxx',
//   },
// });
