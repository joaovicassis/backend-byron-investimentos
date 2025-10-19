import { Request, Response } from 'express';
import { LoginService } from '../../../services/usuario/auth/LoginService';

export class LoginController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body as { email: string; password: string };
    const service = new LoginService();
    const result = await service.execute({ email, password });
    return res.json(result);
  }
}


