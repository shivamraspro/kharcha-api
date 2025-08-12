import { Controller, Post, Body } from '@nestjs/common';
import { SignupDto } from 'src/common/dtos/signup.dto';
import { AuthService } from './auth.service';
import { Serialize } from 'src/common/interceptors/serialize.interceptor';
import { ClientSafeUserDto } from 'src/common/dtos/client-safe-user.dto';

@Serialize(ClientSafeUserDto)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() body: SignupDto) {
    return this.authService.signup(body);
  }
}
