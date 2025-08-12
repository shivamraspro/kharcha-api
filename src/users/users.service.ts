import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  create(user: CreateUserDto) {
    const newUser = this.repo.create(user);
    return this.repo.save(newUser);
  }

  findOneByUuid(uuid: string) {
    return this.repo.find({ where: { uuid } });
  }
}
