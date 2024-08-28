import { ref, onUnmounted } from "vue";
import type { Ref } from "vue";

interface UseCodeParams<T> {
  request: (formState: T) => Promise<void>;
  options?: { phone?: string };
}
export default function useCode<T>({ request, options }: UseCodeParams<T>) {
  const { createToast } = useMessage();
  const codeText = ref("获取验证码");
  const codeTime = ref(0);
  const codeStatus = ref(false);
  const timer: Ref<NodeJS.Timeout | null> = ref(null);

  // 获取验证码
  const getCode = (formState: T, field: string) => {
    if (!formState[field]) {
      return createToast(`请输入正确的手机号`);
    }
    if (codeStatus.value) {
      return createToast(`请${codeTime.value}秒后重新获取`);
    }

    const params = { ...formState };
    if (options?.phone) {
      params[options.phone] = formState[field];
    }

    return new Promise((resolve, reject) => {
      request(params)
        .then((payload) => {
          startCountdown();
          resolve(payload);
          createToast(`获取成功，请注意查收`);
        })
        .catch((error) => {
          stopCountdown();
          reject(error);
          createToast(`获取失败，请稍后再试`);
        });
    });
  };

  const startCountdown = () => {
    codeStatus.value = true;
    codeTime.value = 60;
    codeText.value = `${codeTime.value}S`;
    timer.value = setInterval(() => {
      codeTime.value--;
      codeText.value = `${codeTime.value}S`;
      if (codeTime.value <= 0) {
        stopCountdown();
        codeText.value = "获取验证码";
      }
    }, 1000);
  };

  const stopCountdown = () => {
    codeStatus.value = false;
    timer.value && clearInterval(timer.value as NodeJS.Timeout);
  };

  const clearIntervalFun = () => {
    stopCountdown();
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
