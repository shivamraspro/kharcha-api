import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/modules/users/dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { AuthenticatedUser } from 'src/modules/auth/types/authenticated-user.type';
import { JwtPayload } from 'src/modules/auth/types/jwtPayload.type';

@Injectable()
export class AuthService {
  private readonly saltRounds = 10;

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(body: CreateUserDto) {
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

  async validateUser(email: string, password: string) {
    // Check if the user exists
    const user = await this.usersService.findOne({ email });

    // Check if the passwords match
    const passwordsMatch =
      user && (await bcrypt.compare(password, user.password));

    if (passwordsMatch) {
      const { email, name, uuid } = user;
      return { email, name, uuid } as AuthenticatedUser;
    }

    return null;
  }

  login(user: AuthenticatedUser) {
    const jwtPayload: JwtPayload = {
      user,
    };
    return {
      accessToken: this.jwtService.sign(jwtPayload),
    };
  }
}
