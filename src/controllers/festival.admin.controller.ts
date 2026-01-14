import { Request, Response } from "express";
import prisma from "../lib/prisma";

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