import { Controller, Get, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':uuid')
  findUser(@Param('uuid') uuid: string) {
    return this.usersService.findOne({ uuid });
  }
}
