import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { AuthService } from './auth.service';
import { Serialize } from 'src/common/interceptors/serialize.interceptor';
import { ClientSafeUserDto } from 'src/common/dtos/client-safe-user.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Serialize(ClientSafeUserDto)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login() {}
}
