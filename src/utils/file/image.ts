export const getAssetsImageUrl = (path: string) => {
  return new URL(`/src/assets/${path}`, import.meta.url).href;
};
export const getRelativeImageUrl = (path: string) => {
  return new URL(`${path}`, import.meta.url).href;
};
