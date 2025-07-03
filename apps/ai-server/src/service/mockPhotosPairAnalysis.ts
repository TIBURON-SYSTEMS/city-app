import { MOCK_ITEMS } from "../mock/recycedItems";

export function mockPhotosPairAnalysis(before: Buffer, after: Buffer) {
  // formular to genrate a number between a range -> Math.floor(Math. random() * (max - min) + min)
  // mock to add random 3 trash
  const numItems = Math.random() * (3 - 1) + 1;

  const detectedItems = Array.from({ length: numItems }, () => {
    const label = MOCK_ITEMS[Math.floor(Math.random() * MOCK_ITEMS.length)];
    // mock to generate random item amounts 1 ~ 10
    const amount = Math.floor(Math.random() * (10 - 1) + 1);
    // mock to generate a confidence 0.7 ~ 1.0
    const confidence = (Math.random() * (1 - 0.7) + 0.7).toFixed(2);
    return { label, amount, confidence };
  });

  return {
    detectedItems,
    timestamp: new Date().toISOString(),
  };
}
