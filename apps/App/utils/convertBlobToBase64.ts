function convertBlobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Failed to convert Blob to Base64."));
      }
    };

    reader.onerror = (error) => reject(error);

    // readAsDataURL read Blob as Data URL (Base64)
    reader.readAsDataURL(blob);
  });
}

export default convertBlobToBase64;
