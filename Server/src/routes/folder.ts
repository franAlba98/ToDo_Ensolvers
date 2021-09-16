import { Router } from 'express';
import FolderController from '../controllers/folder.controller';
import { verifyToken } from '../middleware/validation';

const router = Router();
const controller = new FolderController();

router.post('/',controller.new);
router.put('/:idFolder',controller.change);
router.get('/:idFolder',controller.getOne);
router.get('/',controller.getAll);
router.delete('/:idFolder',controller.delete);
router.get('/:idFolder/item',controller.getItems);
router.get('/:idFolder/item/:idItem',controller.getOneItem);

export default router;