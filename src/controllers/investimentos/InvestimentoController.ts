import { Request, Response } from 'express';
import { CriarInvestimentoService } from '../../services/investimentos/CriarInvestimentoService';
import { BuscarInvestimentoService } from '../../services/investimentos/BuscarInvestimentoService';
import { BuscarTodosInvestimentosService } from '../../services/investimentos/BuscarTodosInvestimentosService';
import { AtualizarInvestimentoService } from '../../services/investimentos/AtualizarInvestimentoService';
import { DeletarInvestimentoService } from '../../services/investimentos/DeletarInvestimentoService';
import { AuthRequest } from '../../middleware/isAuthenticated';

export class InvestimentoController {
  // POST /investimentos - Criar investimento
  async criar(req: AuthRequest, res: Response) {
    const { name, investedValue, quantity, dateInvested, ticker } = req.body;
    const userId = req.user!.id;

    const service = new CriarInvestimentoService();
    const result = await service.execute({ name, investedValue, quantity, dateInvested, ticker }, userId);
    return res.status(201).json(result);
  }

  // GET /investimentos/:id - Buscar investimento específico
  async buscar(req: AuthRequest, res: Response) {
    const { id } = req.params;
    const userId = req.user!.id;

    if (!id) {
      return res.status(400).json({ message: 'ID do investimento é obrigatório' });
    }

    const service = new BuscarInvestimentoService();
    const result = await service.execute({ id }, userId);
    return res.json(result);
  }

  // GET /investimentos - Buscar todos investimentos do usuário (com paginação)
  async buscarTodos(req: AuthRequest, res: Response) {
    const userId = req.user!.id;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const service = new BuscarTodosInvestimentosService();
    const result = await service.execute({ userId, page, limit });
    return res.json(result);
  }

  // GET /investimentos/todos - Buscar todos investimentos com dados Brapi (com paginação)
  async buscarTodosComBrapi(req: AuthRequest, res: Response) {
    const userId = req.user!.id;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const service = new BuscarTodosInvestimentosService();
    const result = await service.execute({ userId, page, limit });
    return res.json(result);
  }

  // PUT /investimentos/:id - Atualizar investimento
  async atualizar(req: AuthRequest, res: Response) {
    const { id } = req.params;
    const { quantity } = req.body;
    const userId = req.user!.id;

    if (!id) {
      return res.status(400).json({ message: 'ID do investimento é obrigatório' });
    }

    const service = new AtualizarInvestimentoService();
    const result = await service.execute({ id, quantity }, userId);
    return res.json(result);
  }

  // DELETE /investimentos/:id - Deletar investimento
  async deletar(req: AuthRequest, res: Response) {
    const { id } = req.params;
    const userId = req.user!.id;

    if (!id) {
      return res.status(400).json({ message: 'ID do investimento é obrigatório' });
    }

    const service = new DeletarInvestimentoService();
    const result = await service.execute({ id }, userId);
    return res.json(result);
  }
}
