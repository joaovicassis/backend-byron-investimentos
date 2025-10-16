import { PrismaClient } from '@prisma/client';
import jwt, { JwtPayload } from 'jsonwebtoken';

type Decoded = JwtPayload & { sub: string; jti?: string; exp?: number };

const prisma = new PrismaClient();

export class LogoutService {
  async execute(token?: string) {
    if (!token) {
      return { message: 'Logout efetuado' };
    }
    let decoded: Decoded | undefined;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET ?? 'dev-secret-change-me') as Decoded;
    } catch {
      return { message: 'Logout efetuado' };
    }
    const { jti, exp } = decoded ?? {};
    if (!jti || !exp) {
      return { message: 'Logout efetuado' };
    }
    try {
      await prisma.tokenRevogado.upsert({
        where: { jti },
        create: { jti, exp: new Date(exp * 1000) },
        update: { exp: new Date(exp * 1000) },
      });
    } catch {
      // Se falhar, seguimos com o logout sem travar o usuário.
    }
    return { message: 'Logout efetuado' };
  }
}


