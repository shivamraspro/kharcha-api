import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignupDto } from './dtos';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly saltRounds = 10;

  constructor(private readonly usersService: UsersService) {}

  async signup(body: SignupDto) {
    // Check if the user exists
    const user = await this.usersService.findOne({ email: body.email });
    if (user) throw new BadRequestException('This email is already in use');

    // Hash the password
    const hashedPassword = await bcrypt.hash(body.password, this.saltRounds);

    // Create the user
    const newUser = await this.usersService.create({
      ...body,
      password: hashedPassword,
    });

    return newUser;
  }
}
