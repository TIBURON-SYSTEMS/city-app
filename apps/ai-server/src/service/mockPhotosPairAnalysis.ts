import { MOCK_PRODUCTS } from "../mock/recycedItems";

export function mockPhotosPairAnalysis(before: Buffer, after: Buffer) {
  // formular to genrate a number between a range -> Math.floor(Math. random() * (max - min) + min)
  // mock to add random 3 trash
  const numItems = Math.random() * (5 - 2) + 2;

  const detectedItems = Array.from({ length: numItems }, () => {
    const disposedProduct =
      MOCK_PRODUCTS[Math.floor(Math.random() * MOCK_PRODUCTS.length)];
    // mock to generate random item amounts 1 ~ 10
    const amount = Math.floor(Math.random() * (10 - 1) + 1);
    // mock to generate a confidence 0.7 ~ 1.0
    const confidence = (Math.random() * (1 - 0.7) + 0.7).toFixed(2);
    return { disposedProduct, amount, confidence };
  });

  return {
    detectedItems,
    timestamp: new Date().toISOString(),
  };
}
//
