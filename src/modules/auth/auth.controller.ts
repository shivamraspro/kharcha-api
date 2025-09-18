import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
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
  login(@Req() req: { user: AuthenticatedUser }, @Res({ passthrough: true }) res: Response) {
    // Using passport-local strategy:
    // 1. The user is authenticated by the LocalAuthGuard
    // 2. The authenticated user object is available in the request
    const token = this.authService.login(req.user);

    // Attach JWT as HttpOnly cookie
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // use secure only in HTTPS
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // adjust sameSite for cross-site in production
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    });

    return {
      message: 'Login successful',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('whoami')
  whoami(@Req() req: { user: AuthenticatedUser }) {
    return req.user;
  }
}
