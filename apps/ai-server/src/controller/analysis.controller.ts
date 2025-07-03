import { Request, Response } from "express";

export async function analysisPhotos(req: Request, res: Response) {
  const data = req.body;

  try {
    // execute analysis service
    // two super long base64 string
    console.log(data);

    res.status(200).json({ message: "analysis success" });
  } catch (err) {
    res.status(500).json({ message: "AI Server Internal Error" });
  }
}
