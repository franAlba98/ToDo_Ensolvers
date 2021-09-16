import { Router } from 'express';
import FolderController from '../controllers/folder.controller';
import { verifyToken } from '../middleware/validation';

const router = Router();
const controller = new FolderController();

router.post('/',verifyToken,controller.new);
router.put('/:idFolder',verifyToken,controller.change);
router.get('/:idFolder',verifyToken,controller.getOne);
router.get('/',verifyToken,controller.getAll);
router.delete('/:idFolder',verifyToken,controller.delete);
router.get('/:idFolder/item',verifyToken,controller.getItems);
router.get('/:idFolder/item/:idItem',verifyToken,controller.getOneItem);

export default router;