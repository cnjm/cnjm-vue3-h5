export const getImageUrl = (path = "/src/assets", name: string) => {
  return new URL(`${path}/${name}`, import.meta.url).href;
};
