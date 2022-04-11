export const REDIRECT_NAME = "Redirect";

export const PARENT_LAYOUT_NAME = "ParentLayout";

export const PAGE_NOT_FOUND_NAME = "PageNotFound";

// 错误页
export const EXCEPTION_COMPONENT = () => import("../views/error/exception/index.vue");

/**
 * @description: default layout
 */
export const LAYOUT = () => import("/@/layouts/default/index.vue");

/**
 * @description: error layout
 */
export const ERROR_LAYOUT = () => import("/@/layouts/error/index.vue");
