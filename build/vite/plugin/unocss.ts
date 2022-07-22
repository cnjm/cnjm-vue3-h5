import Unocss from "unocss/vite";
import { presetUno, presetAttributify } from "unocss";

export const configUnocssPlugin = () => {
  return Unocss({
    presets: [presetUno(), presetAttributify()],
  });
};
