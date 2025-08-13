import { Controller, Get, Body, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Serialize } from 'src/common/interceptors/serialize.interceptor';
import { ClientSafeUserDto } from 'src/common/dtos/client-safe-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Serialize(ClientSafeUserDto)
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':uuid')
  findUser(@Param('uuid') uuid: string) {
    return this.usersService.findOne({ uuid });
  }
}
