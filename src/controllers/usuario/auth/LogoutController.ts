import { Request, Response } from 'express';
import { LogoutService } from '../../../services/usuario/auth/LogoutService';

export class LogoutController {
  async handle(req: Request, res: Response) {
    const service = new LogoutService();
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : undefined;
    const result = await service.execute(token);
    return res.json(result);
  }
}


