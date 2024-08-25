import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserBaseDto } from '../common/Dtos/user-base.dto';

@Injectable()
export class AuthPipe implements PipeTransform {
  transform(params: UserBaseDto, metadata: ArgumentMetadata) {
    const salt = 10;

    if (params.password) {
      return {
        ...params,
        password: bcrypt.hashSync(String(params.password), salt),
      };
    }

    return params;
  }
}
