import { Router } from 'express';
import { getCurrentFestival } from '../controllers/festival.controller';

const router = Router();

router.get('/current', getCurrentFestival);

export default router;