import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { NotFoundException } from '@nestjs/common/exceptions';
import { ParseUUIDPipe } from '@nestjs/common/pipes';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/')
  getAll(): any {
    return this.usersService.getAll();
  }

  @Get('/:id')
  public async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = await this.usersService.getById(id);
    if (!user) throw new NotFoundException('User Not Found');
    return user;
  }
}
