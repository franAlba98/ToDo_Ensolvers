import { Router } from 'express';
import UserController from '../controllers/user.controller';

const router = Router();
const controller = new UserController();

router.post('/',controller.new);
router.post('/login', controller.login);
router.get('/:idUser', controller.getOne);


export default router;