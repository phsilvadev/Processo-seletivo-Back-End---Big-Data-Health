import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { UserBaseDto } from 'src/app/common/Dtos/user-base.dto';

export class SingInAuthDto implements UserBaseDto {
  @ApiProperty({
    description: 'Endereço de email do usuário',
    example: 'usuario@example.com',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'senhaSegura123',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
