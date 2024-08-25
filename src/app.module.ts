import { Module } from '@nestjs/common';
import { AuthModule } from './app/auth/auth.module';

import { UserModule } from './app/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './app/user/entities/user.entity';
import { CloudinaryModule } from './app/cloudinary/cloudinary.module';
import { ImageModule } from './app/image/image.module';
import { Image } from './app/image/entities/image.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5498,
      username: 'teste',
      password: 'serverteste',
      database: 'upload',
      entities: [User, Image],
      synchronize: true,
    }),
    AuthModule,
    ImageModule,
    UserModule,
    CloudinaryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
