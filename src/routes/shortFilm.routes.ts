import { Router } from "express";
import { getShortFilmById, getShortFilms } from "../controllers/shortFilm.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get('/', authMiddleware, getShortFilms);
router.get('/:id', authMiddleware, getShortFilmById);

export default router;