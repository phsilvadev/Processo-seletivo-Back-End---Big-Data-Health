import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingUpAuthDto } from './dto/sing-up-auth.dto';
import { SingInAuthDto } from './dto/sing-in-auth.dto';
import { AuthPipe } from './auth.pipe';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('singIn')
  singIn(@Body() createAuthDto: SingInAuthDto) {
    return this.authService.singIn(createAuthDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('singUp')
  create(@Body(new AuthPipe()) createAuthDto: SingUpAuthDto) {
    return this.authService.create(createAuthDto);
  }
}
