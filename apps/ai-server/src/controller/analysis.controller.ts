import { Request, Response } from "express";
import { mockPhotosPairAnalysis } from "../service/mockPhotosPairAnalysis";
import { uuid } from "uuidv4";

export async function analysisPhotos(req: Request, res: Response) {
  const { before, after } = req.body;

  const beforeBuffer = Buffer.from(before, "base64");
  const afterBuffer = Buffer.from(after, "base64");

  try {
    const { detectedItems, timestamp } = mockPhotosPairAnalysis(
      beforeBuffer,
      afterBuffer
    );

    const detectedItemsWithID = detectedItems.map((item) => {
      return { ...item, id: uuid() };
    });

    const result = { detectedItems: detectedItemsWithID, timestamp };

    console.log(result, "result");

    res
      .status(200)
      .json({ result, success: true, message: "analysis success" });
  } catch (err) {
    res.status(500).json({ message: "AI Server Internal Error" });
  }
}
