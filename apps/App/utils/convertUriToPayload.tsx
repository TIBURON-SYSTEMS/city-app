import convertBlobToBase64 from "./convertBlobToBase64";

async function convertUriToPayload(
  userId: string | undefined,
  photoBeforeUri: string,
  photoAfterUri: string
) {
  // generate the blob of photo before
  const res1 = await fetch(photoBeforeUri);
  const blob1 = await res1.blob();

  // generate the blob of photo after
  const res2 = await fetch(photoAfterUri);
  const blob2 = await res2.blob();

  const base64ImageBefore = await convertBlobToBase64(blob1);
  const base64ImageAfter = await convertBlobToBase64(blob2);

  return {
    before: base64ImageBefore,
    after: base64ImageAfter,
    filenameBefore: `photo_before_${userId}_${Date.now()}.png`,
    filenameAfter: `photo_after_${userId}_${Date.now()}.png`,
    typeBefore: "image/png",
    typeAfter: "image/png",
  };
}

export default convertUriToPayload;
