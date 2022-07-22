import projectSetting from "/@/settings/projectSetting";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

//全局进度条的配置
if (projectSetting.openPageLoading) {
  NProgress.configure({
    easing: "ease", // 动画方式
    speed: 1000, // 递增进度条的速度
    showSpinner: false, // 是否显示加载Spinner
    trickleSpeed: 200, // 自动递增间隔
    minimum: 0.3, // 初始化时的最小百分比
  });
}

// 打开进度条
export const startProgress = () => {
  if (!projectSetting.openPageLoading) return;
  NProgress.start();
};

// 关闭进度条
export const closeProgress = () => {
  if (!projectSetting.openPageLoading) return;
  NProgress.done();
};
