import { Request, Response } from "express";
import prisma from "../lib/prisma";

// GET

// Obtener el festival actual
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

// Obtener todos los festivales
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

// Obtener un festival por id
export const getFestivalById = async (req: Request, res: Response) => {

  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

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