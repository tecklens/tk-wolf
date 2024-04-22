import {
  ClassSerializerInterceptor,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiExcludeController, ApiTags } from '@nestjs/swagger';
import { FileService } from '@app/file/file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';

@ApiBearerAuth()
@Controller('file')
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('File')
@ApiExcludeController()
export class FileController {
  constructor(private fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
          new FileTypeValidator({
            fileType: 'image/jpeg|images/png|image/jpg|image/gif',
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    this.fileService.uploadObject(file, file.originalname);
  }

  @Get('s3/staging/:path')
  async downloadFile(
    @Param('path') value: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    res.set({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': 'attachment',
    });
    return new StreamableFile(await this.fileService.downloadObject(value));
  }
}
