import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { SingUpAuthDto } from './dto/sing-up-auth.dto';
import { UserService } from '../user/user.service';
import { SingInAuthDto } from './dto/sing-in-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async singIn(
    singInAuthDto: SingInAuthDto,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.findOneByEmail(singInAuthDto.email);

    if (!user) {
      throw new UnauthorizedException();
    }

    try {
      const isMatch = await bcrypt.compare(
        singInAuthDto.password,
        user.password,
      );

      if (!isMatch) {
        throw new UnauthorizedException();
      }

      const payload = { sub: user.id };

      return {
        access_token: await this.jwtService.sign(payload, { expiresIn: '4h' }),
      };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  create(createAuthDto: SingUpAuthDto) {
    this.userService.create(createAuthDto);
  }
}
