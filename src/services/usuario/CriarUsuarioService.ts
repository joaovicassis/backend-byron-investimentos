import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { CriarUsuarioRequest } from '../../interfaces/usuario/CriarUsuarioRequest';

const prisma = new PrismaClient();

export class CriarUsuarioService {
  async execute({ name, email, password }: CriarUsuarioRequest) {
    const existing = await prisma.usuario.findUnique({ where: { email } });
    if (existing) {
      throw new Error('E-mail já cadastrado');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.usuario.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
        updated_at: true,
      },
    });

    return user;
  }
}


