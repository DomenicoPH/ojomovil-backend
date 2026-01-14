import { Router } from 'express';
import { getAllFestivals, getCurrentFestival, getFestivalById } from '../controllers/festival.controller';

const router = Router();

router.get('/current', getCurrentFestival);
router.get('/', getAllFestivals);
router.get('/:id', getFestivalById);

export default router;