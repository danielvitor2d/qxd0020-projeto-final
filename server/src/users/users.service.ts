import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

import { PrismaService } from 'src/database/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const { password, ...userInput } = createUserInput;

    const currentDate = new Date().toISOString();
    const hashedPassword = await argon2.hash(password);

    return this.prisma.user.create({
      data: {
        ...userInput,
        hashedPassword,
        createdAt: currentDate,
        updatedAt: currentDate,
      },
    });
  }

  async verifyUser(email: string, password: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        AND: [{ email }, { deletedAt: null }],
      },
    });
    if (!user) return null;
    const isValidPassword = await argon2.verify(user.hashedPassword, password);
    if (!isValidPassword) return null;
    return user;
  }

  async validateUser(id: string, email: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        AND: [{ id }, { deletedAt: null }],
      },
    });
    if (!user) return null;
    if (user.email !== email) return null;
    return user;
  }

  async login(user: User) {
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async findAll() {
    return this.prisma.user.findMany({
      where: {
        deletedAt: null,
      },
    });
  }

  async findOne(id: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        AND: [{ id }, { deletedAt: null }],
      },
    });
  }

  async update(id: string, user: Partial<Omit<User, 'hashedPassword'>>) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...user,
      },
    });
  }

  async updatePass(id: string, password: string) {
    const hashedPassword = await argon2.hash(password);
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        hashedPassword,
      },
    });
  }

  async remove(id: string) {
    const deleteDate = new Date().toISOString();
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        deletedAt: deleteDate,
      },
    });
  }
}
