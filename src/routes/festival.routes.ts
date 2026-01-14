import { Router } from 'express';
import { 
    createFestival, 
    deleteFestival, 
    getAllFestivals, 
    getCurrentFestival, 
    getFestivalById, 
    updateFestival
} from '../controllers/festival.controller';

const router = Router();

router.get('/current', getCurrentFestival);
router.get('/', getAllFestivals);
router.get('/:id', getFestivalById);

router.post('/', createFestival);

router.put('/:id', updateFestival);

router.delete('/:id', deleteFestival);

export default router;