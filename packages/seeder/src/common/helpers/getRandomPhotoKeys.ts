
export const getRandomPhotoKeys = (arr: string[], count: number): string[] => {
  const shuffled = arr.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};