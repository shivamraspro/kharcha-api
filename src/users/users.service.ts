import { Injectable } from '@nestjs/common';
import { User } from './types/user.interface';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  createOne(user: User) {
    this.users.push(user);
    return user;
  }

  findOne(user: User) {
    return this.users.find(u => u.email === user.email);
  }
}
