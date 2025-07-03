import { MOCK_ITEMS } from "../mock/recycedItems";

export function mockPhotosPairAnalysis(before: Buffer, after: Buffer) {
  // formular to genrate a number between a range -> Math. random() * (max - min) + min
  // mock to add random 3 trash
  const numItems = Math.random() * (3 - 1) + 1;

  const detectedItems = Array.from({ length: numItems }, () => {
    const label = MOCK_ITEMS[Math.floor(Math.random() * MOCK_ITEMS.length)];
    // mock to generate a confidence 0.7 ~ 1.0
    const confidence = (Math.random() * (1 - 0.7) + 0.7).toFixed(2);
    return { label, confidence };
  });

  return {
    detectedItems,
    timestamp: new Date().toISOString(),
  };
}
