export const REDIRECT_NAME = "Redirect";

export const PARENT_LAYOUT_NAME = "ParentLayout";

export const PAGE_NOT_FOUND_NAME = "PageNotFound";

// 错误页
export const EXCEPTION_COMPONENT = () => import("/@/layouts/error/exception/index.vue");

/**
 * @description: 默认布局
 */
export const LAYOUT = () => import("/@/layouts/default/index.vue");

/**
 * @description: 错误页布局
 */
export const ERROR_LAYOUT = () => import("/@/layouts/error/index.vue");
