import { Router } from 'express';
import ItemController from '../controllers/item.controller';

const router = Router();
const controller = new ItemController();

router.post('/',controller.new);
router.get('/',controller.getAll);

export default router;