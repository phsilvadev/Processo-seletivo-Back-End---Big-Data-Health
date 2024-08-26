import { Module } from '@nestjs/common';
import { AuthModule } from './app/auth/auth.module';

import { UserModule } from './app/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './app/user/entities/user.entity';
import { CloudinaryModule } from './app/cloudinary/cloudinary.module';
import { ImageModule } from './app/image/image.module';
import { Image } from './app/image/entities/image.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
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
