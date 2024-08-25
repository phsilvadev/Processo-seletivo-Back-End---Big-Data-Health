import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { UserBaseDto } from 'src/app/common/Dtos/user-base.dto';

export class SingUpAuthDto implements UserBaseDto {
  @ApiProperty({
    description: 'Endereço de email do usuário',
    example: 'usuario@example.com',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    description: 'Endereço de email do usuário',
    example: 'senhaSegura123',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
