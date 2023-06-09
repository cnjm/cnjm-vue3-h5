import { DialogOptions, showDialog } from "vant";
import "vant/es/dialog/style";
// import { showDialog } from "vant";
// import "vant/lib/dialog/style";

function createConfirm(options: DialogOptions): Promise<unknown> {
  const opt: DialogOptions = { messageAlign: "left", ...options };
  return showDialog(opt) as unknown as Promise<unknown>;
}

/**
 * @description: message
 */
export function useMessage() {
  return {
    createConfirm,
  };
}
