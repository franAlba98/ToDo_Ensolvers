import { Router } from 'express';
import FolderController from '../controllers/folder.controller';

const router = Router();
const controller = new FolderController();

router.post('/',controller.new);
router.put('/:idFolder',controller.change);
router.get('/:idFolder',controller.getOne);
router.get('/',controller.getAll);
router.delete('/:idFolder',controller.delete);

export default router;