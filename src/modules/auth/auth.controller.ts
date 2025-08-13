import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CreateUserDto } from 'src/modules/users/dtos/create-user.dto';
import { AuthService } from 'src/modules/auth/auth.service';
import { Serialize } from 'src/common/interceptors/serialize.interceptor';
import { ClientSafeUserDto } from 'src/common/dtos/client-safe-user.dto';
import { LocalAuthGuard } from 'src/modules/auth/local-auth.guard';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { AuthenticatedUser } from 'src/modules/auth/types/authenticated-user.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Serialize(ClientSafeUserDto)
  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: { user: AuthenticatedUser }) {
    // Using passport-local strategy:
    // 1. The user is authenticated by the LocalAuthGuard
    // 2. The authenticated user object is available in the request
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('whoami')
  whoami(@Request() req: { user: AuthenticatedUser }) {
    return req.user;
  }
}
