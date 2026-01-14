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

export const getAllFestivals = async (_req: Request, res: Response) => {
  try {
    const festivals = await prisma.festivalEdition.findMany({
      orderBy: { year: "desc" },
    });

    if (!festivals) {
      return res.status(404).json({ message: "No festivals found" });
    }

    res.json(festivals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getFestivalById = async (req: Request, res: Response) => {
  const id = req.params.id as string;

  try {
    const festival = await prisma.festivalEdition.findUnique({
      where: { id },
    });

    if (!festival) {
      return res.status(404).json({ message: "Festival edition not found" });
    }

    res.json(festival);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
