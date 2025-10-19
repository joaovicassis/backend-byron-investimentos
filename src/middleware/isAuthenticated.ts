import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

export interface AuthRequest extends Request {
  user?: { id: string; email: string; name: string };
}

export function isAuthenticated(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Token não informado' });
  }

  const [scheme, token] = authHeader.split(' ');
  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Formato de token inválido' });
  }

  try {
    const secret = process.env.JWT_SECRET ?? 'dev-secret-change-me';
    const decoded = jwt.verify(token, secret) as { sub: string; email: string; name: string; jti?: string };

    // Checa blacklist
    const prisma = new PrismaClient();
    if (decoded.jti) {
      // Bloqueia se existir registro ativo na blacklist
      // (opcionalmente poderíamos remover se expirada)
      // Aqui consideramos que a existência já implica revogação até expirar.
      // Para desempenho, em produção use singleton do Prisma.
      // eslint-disable-next-line no-async-promise-executor
      return (async () => {
        const revoked = await prisma.tokenRevogado.findUnique({ where: { jti: decoded.jti! } });
        if (revoked && revoked.exp > new Date()) {
          return res.status(401).json({ message: 'Token revogado' });
        }
        req.user = { id: decoded.sub, email: decoded.email, name: decoded.name };
        return next();
      })();
    }
    req.user = { id: decoded.sub, email: decoded.email, name: decoded.name };
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido' });
  }
}


