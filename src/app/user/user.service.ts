import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SingUpAuthDto } from '../auth/dto/sing-up-auth.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }

  async create(createUser: SingUpAuthDto): Promise<void> {
    await this.userRepository.save(createUser);
  }

  findOneById(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }
}
