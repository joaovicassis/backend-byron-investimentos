import { Request, Response } from 'express';
import { CriarUsuarioService } from '../../services/usuario/CriarUsuarioService';

export class CriarUsuarioController {
  async handle(req: Request, res: Response) {
    const { name, email, password } = req.body as {
      name: string; email: string; password: string;
    };

    const service = new CriarUsuarioService();
    const result = await service.execute({ name, email, password });
    return res.status(201).json(result);
  }
}


