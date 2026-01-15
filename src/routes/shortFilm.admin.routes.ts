import { Router } from "express";
import { 
    getAllShortFilmsAdmin,
    createShortFilm,
    updateShortFilm,
    deleteShortFilm
} from "../controllers/shortFilm.admin.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.get('/', getAllShortFilmsAdmin);
router.post('/', createShortFilm);
router.put('/:id', updateShortFilm);
router.delete('/:id', deleteShortFilm);

export default router;