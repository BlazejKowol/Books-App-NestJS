import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';
import { Book } from '@prisma/client';

@Injectable()
export class BooksService {
  constructor(private prismaService: PrismaService) {}
}
