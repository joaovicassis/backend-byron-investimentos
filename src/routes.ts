import { Router } from 'express';
import { CriarUsuarioController } from './controllers/usuario/CriarUsuarioController';
import { LoginController } from './controllers/usuario/auth/LoginController';
import { LogoutController } from './controllers/usuario/auth/LogoutController';
import { InvestimentoController } from './controllers/investimentos/InvestimentoController';
import { isAuthenticated } from './middleware/isAuthenticated';

export const router = Router();

// Usuário
router.post('/usuario', new CriarUsuarioController().handle);
router.post('/usuario/login', new LoginController().handle);
router.post('/usuario/logout', isAuthenticated, new LogoutController().handle);

// Investimentos (todas as rotas protegidas)
const investimentoController = new InvestimentoController();
router.post('/investimentos', isAuthenticated, investimentoController.criar.bind(investimentoController));
router.get('/investimentos', isAuthenticated, investimentoController.buscarTodos.bind(investimentoController));
router.get('/investimentos/todos', isAuthenticated, investimentoController.buscarTodosComBrapi.bind(investimentoController));
router.get('/investimentos/:id', isAuthenticated, investimentoController.buscar.bind(investimentoController));
router.put('/investimentos/:id', isAuthenticated, investimentoController.atualizar.bind(investimentoController));
router.delete('/investimentos/:id', isAuthenticated, investimentoController.deletar.bind(investimentoController));

export default router;


