export const getTextHalves = (text: string | undefined | null) => {
  if (text) {
    const words = text.split(" ");
    const midPoint = Math.ceil(words.length / 2);
    const halfA = words.slice(0, midPoint).join(" ");
    const halfB = words.slice(midPoint, words.length).join(" ");
    return [halfA, halfB];
  }
  return ["",""];
};
