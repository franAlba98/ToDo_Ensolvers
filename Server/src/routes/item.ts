import { Router } from 'express';
import ItemController from '../controllers/item.controller';
import { verifyToken } from '../middleware/validation';

const router = Router();
const controller = new ItemController();

router.post('/',verifyToken,controller.new);
router.put('/:idItem',verifyToken,controller.change);
router.get('/:idItem',verifyToken,controller.getOne);
router.get('/',verifyToken,controller.getAll);
router.delete('/:idItem',verifyToken,controller.delete);

export default router;