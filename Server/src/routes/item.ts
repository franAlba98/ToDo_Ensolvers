import { Router } from 'express';
import ItemController from '../controllers/item.controller';

const router = Router();
const controller = new ItemController();

router.post('/',controller.new);
router.put('/:idItem',controller.change);
router.get('/:idItem',controller.getOne);
router.get('/',controller.getAll);
router.delete('/:idItem',controller.delete);

export default router;