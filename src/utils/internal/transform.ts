/** px 转 vw, viewportWidth 是设计稿宽度 */
export const px2vw = (size: number | string, viewportWidth = 750): string => {
  const px = Number(size.toString().replace("px", ""));
  // console.log(window.screen.width, px);
  return `${(100 / viewportWidth) * px}vw`;
};
