import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { NotFoundException } from '@nestjs/common/exceptions';
import { ParseUUIDPipe } from '@nestjs/common/pipes';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdminAuthGuard } from 'src/auth/admin-auth.guard';

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

  @Delete('/:id')
  @UseGuards(AdminAuthGuard)
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!(await this.usersService.getById(id)))
      throw new NotFoundException('404 not found');

    await this.usersService.deleteById(id);
    return { success: true };
  }
}
