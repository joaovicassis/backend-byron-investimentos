import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { randomUUID } from 'crypto';
import { LoginRequest } from '../../../interfaces/usuario/LoginRequest';

const prisma = new PrismaClient();

export type Payload = { sub: string; email: string; name: string };

export class LoginService {
  async execute({ email, password }: LoginRequest) {
    const user = await prisma.usuario.findUnique({ where: { email } });
    if (!user) {
      throw new Error('Credenciais inválidas');
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      throw new Error('Credenciais inválidas');
    }

    const secret = process.env.JWT_SECRET ?? 'dev-secret-change-me';
    const payload: Payload = { sub: user.id, email: user.email, name: user.name };
    const jti = randomUUID();
    const token = jwt.sign(payload, secret, { expiresIn: '1d', jwtid: jti });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}


