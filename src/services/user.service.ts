import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) { }

  public async createUser(user: User): Promise<User> {
    try {
      return this.usersRepository.save(user);
    } catch (error: any) {
      throw error;
    }
  }
}
