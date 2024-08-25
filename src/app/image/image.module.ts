import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { CloudinaryConfig } from '../cloudinary/cloudinary.config';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';

@Module({
  imports: [TypeOrmModule.forFeature([Image]), ConfigModule, UserModule],
  controllers: [ImageController],
  providers: [ImageService, CloudinaryConfig],
})
export class ImageModule {}
