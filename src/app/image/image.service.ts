import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CloudinaryConfig } from '../cloudinary/cloudinary.config';
import { UserService } from '../user/user.service';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Cloudinary } from '../common/@types/cloudinary';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
    private cloudinaryConfig: CloudinaryConfig,
    private userService: UserService,
  ) {}

  async uploadImage(
    file: Express.Multer.File,
    userReq: { sub: number },
  ): Promise<Cloudinary> {
    const cloudinary = this.cloudinaryConfig.getCloudinaryInstance();

    // Upload image to Cloudinary
    const uploadResult = await new Promise<Cloudinary>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream((error, result) => {
          if (error) return reject(error);
          resolve(result as unknown as Cloudinary);
        })
        .end(file.buffer);
    });

    const response = uploadResult;

    // Handle successful Cloudinary upload
    try {
      const user = await this.userService.findOneById(userReq.sub);

      const upload: Image = {
        ...response,
        user: user,
        userId: userReq.sub,
      };

      // Save image information to database
      await this.imageRepository.save(upload);

      return response;
    } catch (error) {
      // If database save fails, clean up Cloudinary image
      const cloudinaryId = response.public_id;
      await new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(cloudinaryId, (err) => {
          if (err) return reject(err);
          resolve(true);
        });
      });

      throw new InternalServerErrorException(
        'Failed to save image details to database.',
      );
    }
  }

  findAllById(userId: { sub: number }): Promise<Image[]> {
    return this.imageRepository.find({ where: { userId: userId.sub } });
  }

  async remove(id: string) {
    const cloudinary = this.cloudinaryConfig.getCloudinaryInstance();
    const res = await new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(id.trim(), (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });

    const response = res as { result: string };

    if (response.result == 'not-found') {
      throw new NotFoundException();
    }

    const image = await this.imageRepository.findOne({
      where: { public_id: id },
    });
    this.imageRepository.remove(image);
  }
}
