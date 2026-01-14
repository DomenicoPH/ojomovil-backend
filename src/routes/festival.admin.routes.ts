import { Router } from 'express';
import { 
    createFestival, 
    deleteFestival, 
    updateFestival,

} from '../controllers/festival.admin.controller';

const router = Router();

router.post('/', createFestival);

router.put('/:id', updateFestival);

router.delete('/:id', deleteFestival);

export default router;