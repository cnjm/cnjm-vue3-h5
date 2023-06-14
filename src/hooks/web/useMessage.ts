import type { DialogOptions, ToastOptions } from "vant";
import { showDialog, showToast } from "vant";
import "vant/es/dialog/style";
// import { showDialog } from "vant";
// import "vant/lib/dialog/style";

function createConfirm(options: DialogOptions): Promise<unknown> {
  const opt: DialogOptions = { messageAlign: "left", ...options };
  return showDialog(opt) as unknown as Promise<unknown>;
}

function infoToast(message: string): Promise<unknown> {
  const opt: ToastOptions = { message, forbidClick: true, icon: "none" };
  return showToast(opt) as unknown as Promise<unknown>;
}

/**
 * @description: message
 */
export function useMessage() {
  return {
    createConfirm,
    infoToast,
  };
}
