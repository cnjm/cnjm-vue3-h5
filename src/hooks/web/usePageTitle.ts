import { watch, unref } from "vue";
import { useTitle } from "@vueuse/core";
import { useGlobSetting } from "/@/hooks/setting";
import { useRouter } from "vue-router";

import { REDIRECT_NAME } from "/@/router/constant";

const { title } = useGlobSetting();

export const pageTitle = useTitle();

export function setPageTitle(tTitle: string) {
  pageTitle.value = tTitle ? ` ${tTitle} - ${title} ` : `${title}`;
}

export function usePageTitle() {
  const router = useRouter();
  const { currentRoute } = router;

  watch(
    [() => currentRoute.value.path],
    () => {
      const route = unref(currentRoute);

      if (route.name === REDIRECT_NAME) {
        return;
      }
      const tTitle = route?.meta?.title;
      setPageTitle(tTitle);
    },
    { immediate: true },
  );
}
