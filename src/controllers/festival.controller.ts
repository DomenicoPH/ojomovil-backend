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

// POST

// Crear un festival
export const createFestival = async (req: Request, res: Response) => {
  try {
    const { year, title, description, isCurrent } = req.body;
    const festival = await prisma.festivalEdition.create({
      data: { year, title, description, isCurrent },
    });
    res.status(201).json(festival);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" })
  }
};

// PUT

// Modificar un festival por id
export const updateFestival = async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const { year, title, description, isCurrent } = req.body;

    if(isCurrent){
      await prisma.festivalEdition.updateMany({
        where: { isCurrent: true, NOT: { id } },
        data: { isCurrent: false }
      });
    }

    const updatedFestival = await prisma.festivalEdition.update({
      where: { id },
      data: { year, title, description, isCurrent },
    });

    res.json(updatedFestival);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE

// Eliminar un festival por id
export const deleteFestival = async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    await prisma.festivalEdition.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" })
  }
}