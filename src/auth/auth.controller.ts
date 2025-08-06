import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get('whoami')
  whoAmI(): string {
    return 'Not implemented yet';
  }

  @Post('login')
  login(): string {
    return 'Not implemented yet';
  }

  @Post('signup')
  signup(): string {
    return 'Not implemented yet';
  }
}
