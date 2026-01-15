import { Request, Response } from "express";
import prisma from "../lib/prisma";

// GET /shortfilms (listado publicado)
export const getShortFilms = async (req: Request, res: Response) => {
    try {

        const shortFilm = await prisma.shortFilm.findMany({
            where: { published: true },
            orderBy: { year: 'desc' },
            include: { festivalEdition: true }
        });
        res.json(shortFilm);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// GET /shortfilms/:id (detalle de un corto por id)
export const getShortFilmById = async (req: Request, res: Response) => {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    try {

        const shortFilm = await prisma.shortFilm.findUnique({
            where: { id },
            include: { festivalEdition: true }
        });

        if(!shortFilm || !shortFilm.published) {
            return res.status(404).json({ message: "ShortFilm not found" });
        };

        res.json(shortFilm);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};