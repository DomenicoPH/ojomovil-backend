import { Router } from "express";
import { getShortFilmById, getShortFilms } from "../controllers/shortFilm.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.get('/', getShortFilms);
router.get('/:id', getShortFilmById);

export default router;