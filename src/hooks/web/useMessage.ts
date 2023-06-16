import { showDialog, showToast } from "vant";
import type { DialogOptions, ToastOptions } from "vant";
import "vant/es/dialog/style";
import "vant/es/toast/style";
import { ToastWrapperInstance } from "vant/lib/toast/types";
// import { showDialog } from "vant";
// import "vant/lib/dialog/style";

function createDialog(options: DialogOptions): Promise<unknown> {
  const opt: DialogOptions = { messageAlign: "left", ...options };
  return showDialog(opt) as unknown as Promise<unknown>;
}

function createToast(options?: string | ToastOptions): ToastWrapperInstance {
  if (typeof options === "string") {
    options = { message: options } as ToastOptions;
  }
  const opt: ToastOptions = { forbidClick: true, overlayClass: "", ...options };
  return showToast(opt) as unknown as ToastWrapperInstance;
}

/**
 * @description: message
 */
export function useMessage() {
  return {
    createDialog,
    createToast,
  };
}
