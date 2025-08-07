import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/types/user.interface';
import { LoginDto, SignupDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  signup(signupDto: SignupDto) {
    const { email, password } = signupDto;
    const user = { email, password };
    return this.usersService.createOne(user as User);
  }

  login(loginDto: LoginDto) {
    const user = this.usersService.findOne(loginDto as User);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.password === loginDto.password) {
      return { message: 'Login successful', user };
    } else throw new NotFoundException('Invalid credentials');
  }

  whoAmI() {
    return { message: 'You are authenticated' };
  }
}
