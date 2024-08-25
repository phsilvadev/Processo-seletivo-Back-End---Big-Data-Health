import {
  Controller,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  HttpCode,
  HttpStatus,
  Get,
  Delete,
  Param,
} from '@nestjs/common';

import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../common/guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';

@ApiBearerAuth()
@ApiTags('Image')
@Controller('image')
@UseGuards(AuthGuard)
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data') // Especifica que o endpoint aceita multipart/form-data
  @ApiBody({
    description: 'Arquivo de imagem para upload',
    required: true,
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary', // Indica que o campo é um arquivo binário (imagem)
        },
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Request() req) {
    this.imageService.uploadImage(file, req.user);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  find(@Request() req) {
    return this.imageService.findAllById(req.user);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':publicId/:singnature')
  remove(@Param('publicId') id: string) {
    this.imageService.remove(id);
  }
}
