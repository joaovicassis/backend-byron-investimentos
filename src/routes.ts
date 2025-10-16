import { Router } from 'express';
import { CriarUsuarioController } from './controllers/usuario/CriarUsuarioController';
import { LoginController } from './controllers/usuario/auth/LoginController';
import { LogoutController } from './controllers/usuario/auth/LogoutController';
import { isAuthenticated } from './middleware/isAuthenticated';

export const router = Router();

// Usuário
router.post('/usuario', new CriarUsuarioController().handle);
router.post('/usuario/login', new LoginController().handle);
router.post('/usuario/logout', isAuthenticated, new LogoutController().handle);

export default router;


