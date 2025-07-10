import { MOCK_PRODUCTS } from "../mock/recycedItems";

export function mockPhotosPairAnalysis(before: Buffer, after: Buffer) {
  // formular to generate a number between a range -> Math.floor(Math.random() * (max - min + 1)) + min
  // mock to add random 2 ~ 4 trash
  const numItems = Math.floor(Math.random() * (MOCK_PRODUCTS.length - 1)) + 1;

  // initilize unusedIndexes pool
  const unusedIndexes = MOCK_PRODUCTS.map((_, i) => i);

  const detectedItems = Array.from({ length: numItems }, () => {
    const randomIdx = Math.floor(Math.random() * unusedIndexes.length);
    // remove the index of randomly selected item
    const productIndex = unusedIndexes.splice(randomIdx, 1)[0];
    const disposedProduct = MOCK_PRODUCTS[productIndex];

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
