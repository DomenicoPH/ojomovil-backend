import { Request, Response } from "express";
import prisma from "../lib/prisma";

// GET /admin/shortfilms
export const getAllShortFilmsAdmin = async (_req: Request, res: Response) => {
    try {

        const shortFilms = await prisma.shortFilm.findMany({
            orderBy: { createdAt: 'desc' }
        });

        res.json(shortFilms);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" })
    }
};

// POST /admin/shortfilms
export const createShortFilm = async (req: Request, res: Response) => {

    try {

        const { title, slug, description, embedUrl, duration, year, published, festivalEditionId } = req.body;
        
        if(!title || !slug || !embedUrl || !festivalEditionId) {
            return res.status(400).json({ message: "Required fields missing" });
        }

        const shortFilm = await prisma.shortFilm.create({
            data: { title, slug, description, embedUrl, duration, year, published, festivalEditionId }
        });

        res.status(201).json(shortFilm);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }

};

// PUT /admin/shortfilms/:id
export const updateShortFilm = async (req: Request, res: Response) => {
    try {

        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const { title, slug, description, embedUrl, duration, year, published, festivalEditionId } = req.body;

        const updatedShortFilm = await prisma.shortFilm.update({
            where: { id },
            data: { title, slug, description, embedUrl, duration, year, published, festivalEditionId }
        });

        res.json(updatedShortFilm);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// DELETE /admin/shortfilms/:id
export const deleteShortFilm = async (req: Request, res: Response) => {
    try {

        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

        await prisma.shortFilm.delete({
            where: { id }
        });

        res.status(204).send();

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};