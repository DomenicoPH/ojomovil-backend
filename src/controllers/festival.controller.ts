import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const getCurrentFestival = async (_req: Request, res: Response) => {
  try {
    const festival = await prisma.festivalEdition.findFirst({
      where: { isCurrent: true },
    });

    if (!festival) {
      return res.status(404).json({ message: "No current festival edition" });
    }

    res.json(festival);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
