import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Author } from '@prisma/client';

@Injectable()
export class AuthorsService {
  constructor(private prismaService: PrismaService) {}

  public getAll(): Promise<Author[]> {
    return this.prismaService.author.findMany();
  }

  public getById(id: Author['id']): Promise<Author | null> {
    return this.prismaService.author.findUnique({
      where: { id },
    });
  }

  public async create(authorData: Omit<Author, 'id'>): Promise<Author> {
    try {
      return await this.prismaService.author.create({
        data: authorData,
      });
    } catch (err) {
      if (err.code === 'P2002')
        throw new ConflictException('Author is in the database already');
      throw err;
    }
  }

  public updateById(
    id: Author['id'],
    authorData: Omit<Author, 'id'>,
  ): Promise<Author> {
    try {
      return this.prismaService.author.update({
        where: { id },
        data: authorData,
      });
    } catch (err) {
      if (err.code === 'P2002')
        throw new ConflictException('Author is in the database already');
      throw err;
    }
  }

  public deleteById(id: Author['id']): Promise<Author> {
    return this.prismaService.author.delete({
      where: { id },
    });
  }
}
