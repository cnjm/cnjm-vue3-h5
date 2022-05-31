import type { DialogOptions } from "vant";
import { Dialog } from "vant";

function createConfirm(options: DialogOptions): Promise<unknown> {
  const opt: DialogOptions = { messageAlign: "left", ...options };
  return Dialog.confirm(opt) as unknown as Promise<unknown>;
}

/**
 * @description: message
 */
export function useMessage() {
  return {
    createConfirm,
  };
}
