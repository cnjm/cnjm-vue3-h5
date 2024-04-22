import { ref, onUnmounted } from "vue";
import type { Ref } from "vue";

interface UseCodeParams<T> {
  request: (formState: T) => Promise<void>;
  options?: { phone?: string };
}
export default function useCode<T>({ request, options }: UseCodeParams<T>) {
  const { createToast } = useMessage();
  // 提示语
  const codeText = ref("获取验证码");
  const codeTime = ref(0);
  const codeStatus = ref(false);
  const timer: Ref<NodeJS.Timeout | null> = ref(null);
  // 获取验证码
  const getCode = (formState: T, filed: string) => {
    if (!formState[filed]) {
      return createToast(`请输入正确的手机号`);
    }
    if (codeStatus.value) {
      return createToast(`请${codeTime.value}秒后重新获取`);
    }
    const params = { ...formState };
    if (options?.phone) {
      console.log(options?.phone);
      params[options.phone] = formState[filed];
    }
    return new Promise((resolve, reject) => {
      request(params)
        .then((payload) => {
          codeStatus.value = true;
          codeTime.value = 60;
          codeText.value = `${codeTime.value}S`;
          timer.value = setInterval(() => {
            codeTime.value--;
            codeText.value = `${codeTime.value}S`;
            if (codeTime.value <= 0) {
              codeStatus.value = false;
              // 到点清除
              clearInterval(timer.value as NodeJS.Timeout);
              codeText.value = "获取验证码";
            }
          }, 1000);
          resolve(payload);
          return createToast(`获取成功，请注意查收`);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  const clearIntervalFun = () => {
    codeStatus.value = false;
    // 到点清除
    clearInterval(timer.value as NodeJS.Timeout);
    codeText.value = "获取验证码";
  };
  // 页面卸载也清除
  onUnmounted(() => {
    timer.value && clearInterval(timer.value as NodeJS.Timeout);
  });
  return {
    codeText,
    codeTime,
    codeStatus,
    getCode,
    clearIntervalFun,
  };
}
