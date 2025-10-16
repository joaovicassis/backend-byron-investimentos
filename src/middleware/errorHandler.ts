import { NextFunction, Request, Response } from 'express';

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof Error) {
    const status = err.message.includes('Credenciais') || err.message.includes('não informado') ? 401 : 400;
    return res.status(status).json({ message: err.message });
  }
  return res.status(500).json({ message: 'Erro interno do servidor' });
}


